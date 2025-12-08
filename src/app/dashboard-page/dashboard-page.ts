import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewsService } from '../services/news-service';
import { AiService } from '../services/ai-service';
import { MemeService } from '../services/meme-service';
import { SocketService } from '../services/socket-service';
import { UserManagerService } from '../services/user-manager.service';
import { CryptoRow } from '../models/cryptoRow.interface';
import { NewsPost } from '../models/news.interface';
import { NewsFeed } from "./components/news-feed/news-feed";
import { LivePrices } from "./components/live-prices/live-prices";
import { AiInsights } from "./components/ai-insights/ai-insights";
import { MemeGif } from "./components/meme-gif/meme-gif";
import { Auth as AuthService } from '../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-page',
  imports: [NewsFeed, LivePrices, AiInsights, MemeGif],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  public news: NewsPost[] = [];
  public newsLoading = true;
  public pricesLoading = true;
  public pricesErrorMessage = '';
  public aiInsights: any = '';
  public aiInsightsError = '';
  public memeUrl: any;
  public memeError = false;

  prices: CryptoRow[] = [];
  private subs = new Subscription();

  constructor(
    private newsService: NewsService,
    private aiService: AiService,
    private memeService: MemeService,
    private socketService: SocketService,
    private userManagerService: UserManagerService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
  ) { }

  async ngOnInit() {
    if (await localStorage.getItem('currentUserData') === null) {
      this.router.navigate(['']);
    }
    this.socketService.setCryptoIds(this.userManagerService.currentUserData.assets);
    const pricesSub = this.socketService.prices$().subscribe({
      next: (data: any) => {
        this.ngZone.run(() => {
          this.prices = Object.entries(data).map(([id, value]: any) => ({
            id,
            usd: value.usd,
            usdChange: value.usd_24h_change,
          }));
          console.log('Prices updated', this.prices);
          this.pricesLoading = false;
          this.pricesErrorMessage = '';

          this.cdr.markForCheck();
        });
      },
      error: (err) => {
        console.error('prices$ error', err);
        this.handlePricesError(err);
      },
    });
    this.subs.add(pricesSub);

    const pricesErrorSub = this.socketService.pricesError$().subscribe({
      next: (err) => {
        this.handlePricesError(err);
      },
    });
    this.subs.add(pricesErrorSub);

    const socketErrorSub = this.socketService.connectionErrors$().subscribe({
      next: (err) => {
        this.handlePricesError(err);
      },
    });
    this.subs.add(socketErrorSub);

    this.loadDashboardData();
  }



  public refreshDashboard(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.fetchAiInsights();
    this.fetchNews();
    this.fetchMeme();
  }

  private fetchAiInsights(): void {
    this.aiInsights = '';
    this.aiInsightsError = '';
    this.aiService
      .generateInsights(this.userManagerService.currentUserData)
      .subscribe({
        next: (res) => {
          this.ngZone.run(() => {
            this.aiInsights = res;
            this.aiInsightsError = '';
            this.cdr.markForCheck();
          });
        },
        error: (err) => {
          console.error('Failed to get insights', err);
          this.ngZone.run(() => {
            this.aiInsightsError = 'Unable to load AI insights right now. Please try again later.';
            this.cdr.markForCheck();
          });
        },
      });
  }

  private fetchNews(): void {
    this.newsLoading = true;
    this.newsService.getNews().subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          this.news = res as NewsPost[];
          this.newsLoading = false;
          this.cdr.markForCheck();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.newsLoading = false;
          this.cdr.markForCheck();
        });
        console.error('Failed to get news', err);
      },
    });
  }

  private fetchMeme(): void {
    this.memeError = false;
    this.memeUrl = '';
    this.memeService
      .getMemeAi(this.userManagerService.currentUserData)
      .subscribe({
        next: (res) => {
          this.ngZone.run(() => {
            this.memeUrl = res;
            console.log('memeUrl', this.memeUrl);
            this.cdr.markForCheck();
          });
        },
        error: (err) => {
          console.error('Failed to get meme', err);
          this.ngZone.run(() => {
            this.memeError = true;
            this.cdr.markForCheck();
          });
        },
      });
  }

  public logout() {
    this.ngOnDestroy();
    this.router.navigate(['']);

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.socketService.disconnectFromSocket();
    this.authService.logout();
  }

  private handlePricesError(err: any) {
    console.error('prices_error event', err);
    const fallbackMessage = 'Unable to load live prices right now. Please try again later.';
    const incomingMessage = typeof err === 'string' ? err : err?.message;
    this.ngZone.run(() => {
      this.pricesLoading = false;
      this.pricesErrorMessage = incomingMessage || fallbackMessage;
      this.cdr.markForCheck();
    });
  }
}
