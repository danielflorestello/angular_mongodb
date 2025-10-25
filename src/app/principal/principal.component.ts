import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { NgFor } from '@angular/common';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NgFor],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  error = '';
  chat: any;
  users: any;
  user_id: number = 0;

  constructor(
    private service: ApiService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.getUsers();
  }

  getUserId() {
    this.user_id = this.authService.getUserId();
  }

  getUsers(): void {
    this.service.getUsers(this.user_id).subscribe({
      next: (data) => {
        this.users = data;
      },

      error: (e) => console.error(e)
    })
  }

  mostrarChat(username2: string) {
    this.router.navigate(['room', username2]);
  }
}
