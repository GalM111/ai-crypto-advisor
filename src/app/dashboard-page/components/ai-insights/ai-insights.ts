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
  constructor() { }
}
