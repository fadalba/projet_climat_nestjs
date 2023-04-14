import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_BASE_URL = 'http://localhost:3001/auth';
  headers = new HttpHeaders().set('content-type', 'application/json');

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<any> {
    if (!credentials.role) {
      credentials.role = 'admin';
    }
    return this.http.post<any>(this.API_BASE_URL + '/login', credentials);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null && authToken !== undefined ? true : false;
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeConnectedUser = localStorage.removeItem('connectedUser');
    if (removeToken == null && removeConnectedUser == null) {
      this.router.navigate(['/']);
    }
  }

  profile() {
    return this.http.get(this.API_BASE_URL+ '/profile', {headers: this.headers})
  }

}
