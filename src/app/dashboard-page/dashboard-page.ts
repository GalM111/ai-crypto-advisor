import { Component } from '@angular/core';
import { NewsService } from '../services/news-service';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { AiInsights } from "./components/ai-insights/ai-insights"; // or CommonModule
import { AiService } from '../services/ai-service';
import { MemeService } from '../services/meme-service';
import { SocketService } from '../services/socket-service';
import { CryptoRow } from '../models/cryptoRow.interface';
import { UserManagerService } from '../services/user-manager.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [NgFor],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  public news: any;
  public aiInsights: any;
  public memeUrl: any = '';

  prices$!: Observable<CryptoRow[]>;

  prices: CryptoRow[] = [];
  private sub?: Subscription;

  constructor(private newsService: NewsService, private aiService: AiService, private memeService: MemeService, private socketService: SocketService, private userManagerService: UserManagerService) {

  }

  ngAfterViewInit(): void {

  }

  async ngOnInit() {

    this.socketService.setCryptoIds('bitcoin,solana');

    this.sub = this.socketService.prices$().subscribe((data: any) => {
      this.prices = Object.entries(data).map(([id, value]: any) => ({
        id,
        usd: value.usd,
        usdChange: value.usd_24h_change,
      }));
      console.log(this.prices);

    });

    this.aiService.generateInsights(this.userManagerService.currentUserData).subscribe({
      next: (res) => {
        this.aiInsights = res;
      },
      error: err => console.error('Failed to get insights', err)
    });

    this.newsService.getNews().subscribe({
      next: (res) => {
        console.log("NEWS");

        this.news = res;
        console.log(this.news);

      },
      error: err => console.error('Failed to get news', err)

    })

    this.memeService.getMemeAi(this.userManagerService.currentUserData).subscribe({
      next: (res) => {
        console.log("MEME");
        this.memeUrl = res;
        console.log(this.news);
      },
      error: err => console.error('Failed to get news', err)

    })




  }


  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
