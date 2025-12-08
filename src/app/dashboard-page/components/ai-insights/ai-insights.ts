import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerService } from '../../../services/user-manager.service';
import { UserData } from '../../../models/user-data';
import { UpdateUserDataDto } from '../../../models/updateUserData.interface';

@Component({
  selector: 'app-ai-insights',
  imports: [CommonModule],
  templateUrl: './ai-insights.html',
  styleUrl: './ai-insights.scss',
})
export class AiInsights {
  @Input() aiInsights: string = "Loading market analysis...";
  @Input() errorMessage = '';
  public now: Date = new Date();
  public liked: boolean = false;
  public disliked: boolean = false;

  constructor(private userManagerService: UserManagerService) { }

  public toggleLike(): void {
    this.liked = !this.liked;
    if (this.liked) {
      this.disliked = false;
      this.userManagerService.updateUserData(this.userManagerService.currentUserData._id, { likedContent: this.aiInsights }).subscribe({
        next: (res) => {
          localStorage.setItem('currentUserData', JSON.stringify(res));
          this.userManagerService.currentUserData = res as UserData;
        },
        error: (err) => { console.error('Create failed:', err) }
      });

    }
  }

  public toggleDislike(): void {
    this.disliked = !this.disliked;
    if (this.disliked) {
      this.liked = false;
    }
    this.userManagerService.updateUserData(this.userManagerService.currentUserData._id, { dislikedContent: this.aiInsights }).subscribe({
      next: (res) => {
        localStorage.setItem('currentUserData', JSON.stringify(res));
        this.userManagerService.currentUserData = res as UserData;
      },
      error: (err) => { console.error('Create failed:', err) }
    });

  }

}
