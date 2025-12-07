import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerService } from '../../../services/user-manager.service';
import { UserData } from '../../../models/user-data';
@Component({
  selector: 'app-meme-gif',
  imports: [CommonModule],
  templateUrl: './meme-gif.html',
  styleUrl: './meme-gif.scss',
})
export class MemeGif {
  @Input() memeUrl: string = '';
  liked = false;
  disliked = false;

  constructor(private userManagerService: UserManagerService,
  ) { }

  toggleLike(): void {
    this.liked = !this.liked;
    if (this.liked) {
      this.disliked = false;
    }
    this.userManagerService.updateUserData(this.userManagerService.currentUserData._id, { likedContent: this.memeUrl }).subscribe({
      next: (res) => {
        console.log('updated:', res)
        localStorage.setItem('currentUserData', JSON.stringify(res));
        this.userManagerService.currentUserData = res as UserData;
        console.log(res);

      },
      error: (err) => { console.error('Create failed:', err) }
    });
  }

  toggleDislike(): void {
    this.disliked = !this.disliked;
    if (this.disliked) {
      this.liked = false;
    }
    this.userManagerService.updateUserData(this.userManagerService.currentUserData._id, { dislikedContent: this.memeUrl }).subscribe({
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
