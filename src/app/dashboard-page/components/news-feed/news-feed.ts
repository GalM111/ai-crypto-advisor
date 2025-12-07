import { Component, Input } from '@angular/core';
import { NewsPost } from '../../../models/news.interface';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { UserManagerService } from '../../../services/user-manager.service';
import { UserData } from '../../../models/user-data';


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
  private dislikedPosts = new Set<string>();

  constructor(private userManagerService: UserManagerService,
  ) { }

  toggleLike(post: NewsPost): void {
    const key = this.getPostKey(post);
    if (this.likedPosts.has(key)) {
      this.likedPosts.delete(key);
    } else {
      this.likedPosts.add(key);
      this.dislikedPosts.delete(key);
      this.userManagerService.updateUserData(this.userManagerService.currentUserData._id, { likedContent: JSON.stringify(post) }).subscribe({
        next: (res) => {
          console.log('updated:', res)
          localStorage.setItem('currentUserData', JSON.stringify(res));
          this.userManagerService.currentUserData = res as UserData;
          console.log(res);

        },
        error: (err) => { console.error('Create failed:', err) }
      });
    }
  }

  isLiked(post: NewsPost): boolean {
    return this.likedPosts.has(this.getPostKey(post));
  }

  toggleDislike(post: NewsPost): void {
    const key = this.getPostKey(post);
    if (this.dislikedPosts.has(key)) {
      this.dislikedPosts.delete(key);
    } else {
      this.dislikedPosts.add(key);
      this.likedPosts.delete(key);
      this.userManagerService.updateUserData(this.userManagerService.currentUserData._id, { dislikedContent: JSON.stringify(post) }).subscribe({
        next: (res) => {
          console.log('updated:', res)
          localStorage.setItem('currentUserData', JSON.stringify(res));
          this.userManagerService.currentUserData = res as UserData;
          console.log(res);

        },
        error: (err) => { console.error('Create failed:', err) }
      });

    }
  }

  isDisliked(post: NewsPost): boolean {
    return this.dislikedPosts.has(this.getPostKey(post));
  }

  private getPostKey(post: NewsPost): string {
    return `${post.title}-${post.published_at}`;
  }

}
