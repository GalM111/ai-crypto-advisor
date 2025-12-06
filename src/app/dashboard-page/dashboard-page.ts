import { Component } from '@angular/core';
import { NewsService } from '../services/news-service';
import { firstValueFrom, Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { AiInsights } from "./components/ai-insights/ai-insights"; // or CommonModule
import { AiService } from '../services/ai-service';
import { MemeService } from '../services/meme-service';
import { SocketService } from '../services/socket-service';

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



  title = 'Socket.IO + Angular Chat';
  message = '';
  messages: string[] = [];
  constructor(private newsService: NewsService, private aiService: AiService, private memeService: MemeService, private socketService: SocketService) {

  }

  ngAfterViewInit(): void {

  }

  async ngOnInit() {

    this.socketService.onMessage((msg: string) => {
      console.log(msg);

      this.messages.push(msg);
    });

    // Listen to connect / disconnect globally
    this.socketService.socket.on('connect', () => {
      console.log('Socket connected with id:', this.socketService.socket);
    });

    try {
      // this.news = await firstValueFrom(this.newsService.getNews());
      // console.log('news after await:', this.news);
      // this.aiInsights = await firstValueFrom(this.aiService.generateAiContentByPrompt('hello'));
      // console.log('AI Insights after await:', this.aiInsights);
      // this.memeUrl = (await firstValueFrom(this.memeService.getMeme("cat")));
      // console.log('Meme URL after await:', this.memeUrl);
    } catch (err) {
      console.error('Error loading news:', err);

    }




  }

  sendMessage(): void {
    console.log("send msg clicked");

    this.socketService.sendMessage("connection");
  }




  // ngOnDestroy() {
  //   // Unsubscribe from WebSocket messages and close the connection
  //   this.messageSubscription.unsubscribe();
  //   this.webSocketService.closeConnection();
  // } add this!!!!

}
