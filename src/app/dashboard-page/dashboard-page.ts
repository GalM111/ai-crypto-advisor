import { Component } from '@angular/core';
import { NewsService } from '../services/news-service';
import { firstValueFrom, Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { AiInsights } from "./components/ai-insights/ai-insights"; // or CommonModule
import { WebSocketService } from '../services/web-socket-service';
import { AiService } from '../services/ai-service';
import { MemeService } from '../services/meme-service';

@Component({
  selector: 'app-dashboard-page',
  imports: [NgFor, AiInsights],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  public news: any;
  public aiInsights: any;
  public memeUrl: any = '';

  messages: any[] = [];
  private messageSubscription: Subscription = new Subscription();
  constructor(private newsService: NewsService, private webSocketService: WebSocketService, private aiService: AiService, private memeService: MemeService) {

  }

  ngAfterViewInit(): void {

  }

  async ngOnInit() {
    try {
      this.news = await firstValueFrom(this.newsService.getNews());
      console.log('news after await:', this.news);
      this.aiInsights = await firstValueFrom(this.aiService.generateAiContentByPrompt('hello'));
      console.log('AI Insights after await:', this.aiInsights);
      this.memeUrl = (await firstValueFrom(this.memeService.getMeme("cat")));
      console.log('Meme URL after await:', this.memeUrl);
    } catch (err) {
      console.error('Error loading news:', err);

    }

    // // Subscribe to messages from the WebSocket
    // this.messageSubscription = this.webSocketService.getMessages().subscribe(
    //   (message) => {
    //     this.messages.push(message);
    //   }
    // );

  }

  sendMessage() {
    const message = { type: 'message', data: 'Hello, Server!' };
    this.webSocketService.sendMessage(message);
  }


  // ngOnDestroy() {
  //   // Unsubscribe from WebSocket messages and close the connection
  //   this.messageSubscription.unsubscribe();
  //   this.webSocketService.closeConnection();
  // }

}
