import { Component } from '@angular/core';
import { NewsService } from '../services/news-service';
import { firstValueFrom } from 'rxjs';
import { NgFor } from '@angular/common'; // or CommonModule

@Component({
  selector: 'app-dashboard-page',
  imports: [NgFor],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  public news: any;
  public test = 'fasd';
  constructor(private newsService: NewsService) {
    // this.news = this.loadNews();
    // console.log(this.news);

    // this.test = this.news[0]
  }

  ngAfterViewInit(): void {

  }

  async ngOnInit() {
    try {
      this.news = await firstValueFrom(this.newsService.getNews());
      console.log('news after await:', this.news);
    } catch (err) {
      console.error('Error loading news:', err);
    }
  }


  private loadNews(): void { //delete???
    this.newsService.getNews().subscribe({
      next: (data: any[]) => {
        console.log('News API response:', data);
        // return data;
        this.news = data;
      },
      error: (error) => {
        console.error('Error loading news:', error);
      },
    });
  }
}
