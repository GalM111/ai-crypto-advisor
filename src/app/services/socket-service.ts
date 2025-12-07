// socket.service.ts
import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketService {
  public socket: Socket;

  constructor() {
    this.socket = io(environment.webSocketServerUrl);
  }

  public setCryptoIds(ids: string | string[]) {
    this.socket.emit('set_crypto_ids', ids);
  }

  public prices$(): Observable<any> {
    return fromEvent<any>(this.socket, 'prices');
  }

  public pricesError$(): Observable<any> {
    return fromEvent<any>(this.socket, 'prices_error');
  }
}
