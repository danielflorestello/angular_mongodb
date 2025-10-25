import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user_id: any;
  private userData: any;
  private pass: any;

  constructor(private http: HttpClient) { }

  authUrl = "http://127.0.0.1:8000/auth/"

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });
    
    return this.http.get(this.authUrl, { headers });
  }

  saveData(id: number, user: string, password: string) {
    localStorage.setItem('user_id', JSON.stringify(id));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('password', JSON.stringify(password));
  }

  getUser() {
    this.userData = localStorage.getItem('user');
    return JSON.parse(this.userData);
  }

  getPassword() {
    this.pass = localStorage.getItem('password');
    return JSON.parse(this.pass);
  }

  getUserId() {
    this.user_id = localStorage.getItem('user_id');
    return JSON.parse(this.user_id);
  }

  isAuth(): boolean {
    return localStorage.length > 0;
  }

  logout(): void {
    localStorage.clear();
  }
}
