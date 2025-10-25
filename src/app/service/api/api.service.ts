import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl = "http://127.0.0.1:8000"

  getUsers(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/api/users/' + id + '/');
  }

  getMessage(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/chatMensaje/');
  }

  getChat(username1: string, username2: string): Observable<any> {
    return this.http.get(this.apiUrl + '/chat/' + '?username1=' + username1 + '&' + 'username2=' + username2);
  }
}
