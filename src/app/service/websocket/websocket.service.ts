import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();

  constructor() { }

  connect(room_id: string): void {
    const url = 'ws://127.0.0.1:8000/ws/room/' + room_id + '/';

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('WEBSOCKET ABIERTO');
    };

    this.socket.onclose = () => {
      console.log('WEBSOCKET CERRADO');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messageSubject.next(data);
    };
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  sendMessage(message: string, sender: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {

      this.socket.send(JSON.stringify({ message, sender }));

    } else {
      console.error('WebSocket no está conectado');
    }
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
