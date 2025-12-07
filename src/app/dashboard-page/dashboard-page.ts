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
  public aiInsights: any;
  public memeUrl: any;
  public memeError = false;

  prices: CryptoRow[] = [];
  private sub?: Subscription;

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
    this.sub = this.socketService.prices$().subscribe({
      next: (data: any) => {
        this.ngZone.run(() => {
          this.prices = Object.entries(data).map(([id, value]: any) => ({
            id,
            usd: value.usd,
            usdChange: value.usd_24h_change,
          }));
          console.log('Prices updated', this.prices);
          this.pricesLoading = false;

          this.cdr.markForCheck();
        });
      },
      error: (err) => {
        console.error('prices$ error', err);
        this.ngZone.run(() => {
          this.pricesLoading = false;
          this.cdr.markForCheck();
        });
      },
    });

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
    this.aiService
      .generateInsights(this.userManagerService.currentUserData)
      .subscribe({
        next: (res) => {
          this.ngZone.run(() => {
            this.aiInsights = res;
            this.cdr.markForCheck();
          });
        },
        error: (err) => console.error('Failed to get insights', err),
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
    this.sub?.unsubscribe();
    this.authService.logout();
  }
}
