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
  private likedPosts = new Set<string>();

  toggleLike(post: NewsPost): void {
    const key = this.getPostKey(post);
    if (this.likedPosts.has(key)) {
      this.likedPosts.delete(key);
    } else {
      this.likedPosts.add(key);
    }
  }

  isLiked(post: NewsPost): boolean {
    return this.likedPosts.has(this.getPostKey(post));
  }

  private getPostKey(post: NewsPost): string {
    return `${post.title}-${post.published_at}`;
  }

}
