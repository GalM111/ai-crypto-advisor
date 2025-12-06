// socket.service.ts
import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  public socket: Socket; //change!!!

  constructor() {
    this.socket = io('http://localhost:5002'); // Connect to Socket.IO server //temp!!!
  }

  // 🔹 client → server: send IDs
  setCryptoIds(ids: string | string[]) {
    this.socket.emit('set_crypto_ids', ids);
  }

  // 🔹 server → client: listen for prices
  prices$(): Observable<any> {
    return fromEvent<any>(this.socket, 'prices');
  }

  // optional: listen for errors
  pricesError$(): Observable<any> {
    return fromEvent<any>(this.socket, 'prices_error');
  }
}
