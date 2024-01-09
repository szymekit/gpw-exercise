import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role, User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`);
  }

  createUser(body: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, body);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  editUser(body: User): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/${body.id}`, body);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }
}
