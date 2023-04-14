import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_BASE_URL = 'http://localhost:3001/users';
  headers = new HttpHeaders().set('content-type', 'application/json');
  constructor(private http:HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_BASE_URL, {headers: this.headers});
  }
  getUsersArchive(): Observable<User[]> {
    return this.http.get<User[]>(this.API_BASE_URL + "/archive", {headers: this.headers});
  }

  changerRole(id: string) {
    return this.http.patch(this.API_BASE_URL + "/switch/" +id, {}, {headers: this.headers})
  }
  register(user: Partial<User>): Observable<any> {
    return this.http.post(this.API_BASE_URL, user, {headers: this.headers})
  }
  getConnectedUser(email: string): Observable<Partial<User>> {
    return this.http.get(this.API_BASE_URL + "/" + email, {headers: this.headers});
  }

  delete(id: string) {
    return this.http.delete(this.API_BASE_URL + "/" +id)
  }
 modifUsers(id: string, user:any):Observable<any> {
  return this.http.patch(this.API_BASE_URL + "/" +id,user, {})
 }
 modifPassword(id: string, user:any):Observable<any> {
  return this.http.patch(this.API_BASE_URL + "/password/" +id,user, {})
 }


  update(id: string ,data: any){
    return this.http.patch(this.API_BASE_URL + "/" +id, data)
  }

  restaure(id: string){
    return this.http.patch(this.API_BASE_URL + "/restore/" +id, {}, {headers: this.headers})
  }

}

