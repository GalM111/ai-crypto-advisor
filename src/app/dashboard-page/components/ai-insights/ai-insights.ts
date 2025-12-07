import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-insights',
  imports: [CommonModule],
  templateUrl: './ai-insights.html',
  styleUrl: './ai-insights.scss',
})
export class AiInsights {
  @Input() aiInsights: string = "Loading market analysis...";
  now: Date = new Date();
  liked = false;
  disliked = false;

  toggleLike(): void {
    this.liked = !this.liked;
    if (this.liked) {
      this.disliked = false;
    }
  }

  toggleDislike(): void {
    this.disliked = !this.disliked;
    if (this.disliked) {
      this.liked = false;
    }
  }
}
