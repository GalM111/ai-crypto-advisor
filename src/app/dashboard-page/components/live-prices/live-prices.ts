import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerService } from '../../../services/user-manager.service';
import { UserData } from '../../../models/user-data';
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

  constructor(private userManagerService: UserManagerService) { }

  public toggleLike(coinId: string): void {
    if (this.likedCoins.has(coinId)) {
      this.likedCoins.delete(coinId);
    } else {
      this.likedCoins.add(coinId);
      this.dislikedCoins.delete(coinId);
      this.userManagerService.updateUserData(this.userManagerService.currentUserData._id, { likedContent: coinId }).subscribe({
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

  public isLiked(coinId: string): boolean {
    return this.likedCoins.has(coinId);
  }

  public toggleDislike(coinId: string): void {
    if (this.dislikedCoins.has(coinId)) {
      this.dislikedCoins.delete(coinId);
    } else {
      this.dislikedCoins.add(coinId);
      this.likedCoins.delete(coinId);
      this.userManagerService.updateUserData(this.userManagerService.currentUserData._id, { dislikedContent: coinId }).subscribe({
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


  public isDisliked(coinId: string): boolean {
    return this.dislikedCoins.has(coinId);
  }
}
