import { Component } from '@angular/core';
import { WebSocketService } from '../../../services/web-socket-service';

@Component({
  selector: 'app-ai-insights',
  imports: [],
  templateUrl: './ai-insights.html',
  styleUrl: './ai-insights.scss',
})
export class AiInsights {
  constructor(private webSocketService: WebSocketService) { }
}
