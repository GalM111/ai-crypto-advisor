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
}
