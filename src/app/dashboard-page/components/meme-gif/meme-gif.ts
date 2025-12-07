import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-meme-gif',
  imports: [CommonModule],
  templateUrl: './meme-gif.html',
  styleUrl: './meme-gif.scss',
})
export class MemeGif {
  @Input() memeUrl: string | null = null;
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
