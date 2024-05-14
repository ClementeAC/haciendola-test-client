import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl: string;
  private myAPIUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3001/';
    this.myAPIUrl = 'api/users';
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myAPIUrl}`, user);
  }

  logIn(user: User): Observable<string> {
    return this.http.post<string>(
      `${this.myAppUrl}${this.myAPIUrl}/login`,
      user
    );
  }
}
