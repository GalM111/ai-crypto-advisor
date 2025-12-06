import { Component, NgZone } from '@angular/core';
import { NewsService } from '../services/news-service';
import { Observable, Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { AiService } from '../services/ai-service';
import { MemeService } from '../services/meme-service';
import { SocketService } from '../services/socket-service';
import { CryptoRow } from '../models/cryptoRow.interface';
import { UserManagerService } from '../services/user-manager.service';
import { NewsFeed } from "./components/news-feed/news-feed";
import { NewsPost } from '../models/news.interface';
import { LivePrices } from "./components/live-prices/live-prices";
import { AiInsights } from "./components/ai-insights/ai-insights";
import { MemeGif } from "./components/meme-gif/meme-gif";

@Component({
  selector: 'app-dashboard-page',
  // if this is a standalone component, keep this; otherwise you can remove it
  // standalone: true,
  imports: [NewsFeed, LivePrices, AiInsights, MemeGif],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  public news: NewsPost[] = [];
  public newsLoading = true;
  public aiInsights: any;
  public memeUrl: any;

  // prices$!: Observable<CryptoRow[]>;
  prices: CryptoRow[] = [];
  private sub?: Subscription;

  constructor(
    private newsService: NewsService,
    private aiService: AiService,
    private memeService: MemeService,
    private socketService: SocketService,
    private userManagerService: UserManagerService,
    private ngZone: NgZone,
  ) {


  }

  async ngOnInit() {
    console.log(this.userManagerService.currentUserData);
    console.log(this.userManagerService.currentUserData.assets);

    this.socketService.setCryptoIds(this.userManagerService.currentUserData.assets);
    // this.socketService.setCryptoIds('bitcoin');

    this.sub = this.socketService.prices$().subscribe({
      next: (data: any) => {
        this.ngZone.run(() => {
          this.prices = Object.entries(data).map(([id, value]: any) => ({
            id,
            usd: value.usd,
            usdChange: value.usd_24h_change,
          }));
          console.log('Prices updated', this.prices);
        });
      },
      error: (err) => console.error('prices$ error', err),
    });

    this.loadDashboardData();
  }

  refreshDashboard(): void {
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
            console.log('aiInsights', this.aiInsights);
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
          console.log('news', this.news);
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.newsLoading = false;
        });
        console.error('Failed to get news', err);
      },
    });
  }

  private fetchMeme(): void {
    this.memeService
      .getMemeAi(this.userManagerService.currentUserData)
      .subscribe({
        next: (res) => {
          this.ngZone.run(() => {
            this.memeUrl = res;
            console.log('memeUrl', this.memeUrl);
          });
        },
        error: (err) => console.error('Failed to get meme', err),
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
