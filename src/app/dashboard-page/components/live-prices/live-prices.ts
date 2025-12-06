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
  private likedCoins = new Set<string>();

  toggleLike(coinId: string): void {
    if (this.likedCoins.has(coinId)) {
      this.likedCoins.delete(coinId);
    } else {
      this.likedCoins.add(coinId);
    }
  }

  isLiked(coinId: string): boolean {
    return this.likedCoins.has(coinId);
  }
}
