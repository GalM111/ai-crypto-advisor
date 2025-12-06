// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  public socket: Socket; //change!!!

  constructor() {
    this.socket = io('http://localhost:5002'); // Connect to Socket.IO server //temp!!!
  }

  // Method to send message to the server
  sendMessage(message: string): void {

    this.socket.emit('message', message);
  }

  // Observable to receive messages from the server
  onMessage(callback: (message: string) => void): void {
    this.socket.on('message', callback);
  }
}
