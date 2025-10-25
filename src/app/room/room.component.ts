import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { WebsocketService } from '../service/websocket/websocket.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit, OnDestroy {
  chat: any;
  user: string = '';
  username2: any;
  username1: any;
  messages: any[] = [];
  newMessage: string = '';
  boxMessages: any;

  private messageSubscription!: Subscription;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private websocketService: WebsocketService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getChat();
    this.getMessage();
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();

    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  getUser(): void {
    this.user = this.authService.getUser();
  }

  getChat(): void {
    this.username1 = this.authService.getUser();

    this.route.params.subscribe(params => {
      this.username2 = params['username2'];
    });

    this.apiService.getChat(this.username1, this.username2).subscribe({
      next: (data) => {
        this.chat = data;

        const uniqueRoom = new Set();
        for (let i = 0; i < data.length; i++) {
          const list = data[i];
          if (!uniqueRoom.has(list.room)) {
            uniqueRoom.add(list.room);
            this.connectSocket(list.room);
          }
        }
      },

      error: (e) => console.error(e),
    })
  }

  connectSocket(room_id: string): void {
    this.websocketService.connect(room_id)
  }

  sendMessage(): void {
    this.user = this.authService.getUser();

    if (this.newMessage.trim() !== '') {
      this.websocketService.sendMessage(this.newMessage.trim(), this.user);
      this.newMessage = '';

    } else {
      alert('Envió un mensaje vacío.');
    }
  }

  getMessage(): void {
    this.messageSubscription = this.websocketService.getMessages().subscribe({
      next: (data) => {
        this.messages.push(data);
      }
    })
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['home']);
  }

}
