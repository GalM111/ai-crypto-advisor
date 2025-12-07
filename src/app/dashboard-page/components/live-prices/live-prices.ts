import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-live-prices',
  imports: [CommonModule],
  templateUrl: './live-prices.html',
  styleUrl: './live-prices.scss',
})
export class LivePrices {
  @Input() prices: any = [];
  @Input() loading = true;
  readonly placeholderRows = Array.from({ length: 3 });
  private likedCoins = new Set<string>();
  private dislikedCoins = new Set<string>();

  toggleLike(coinId: string): void {
    if (this.likedCoins.has(coinId)) {
      this.likedCoins.delete(coinId);
    } else {
      this.likedCoins.add(coinId);
      this.dislikedCoins.delete(coinId);
    }
  }

  isLiked(coinId: string): boolean {
    return this.likedCoins.has(coinId);
  }

  toggleDislike(coinId: string): void {
    if (this.dislikedCoins.has(coinId)) {
      this.dislikedCoins.delete(coinId);
    } else {
      this.dislikedCoins.add(coinId);
      this.likedCoins.delete(coinId);
    }
  }

  isDisliked(coinId: string): boolean {
    return this.dislikedCoins.has(coinId);
  }
}
