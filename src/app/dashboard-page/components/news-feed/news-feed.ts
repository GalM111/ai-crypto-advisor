import { Component, Input } from '@angular/core';
import { NewsPost } from '../../../models/news.interface';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-news-feed',
  imports: [NgFor, NgIf, DatePipe, CommonModule],
  templateUrl: './news-feed.html',
  styleUrl: './news-feed.scss',
})
export class NewsFeed {
  @Input() newsArr: NewsPost[] = [];
  @Input() loading = true;


}
