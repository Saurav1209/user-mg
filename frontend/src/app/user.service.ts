import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private editingUser = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: any, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  generatePDF(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pdf/generate`, { responseType: 'blob' });
  }
  getPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pdf/view`, { responseType: 'blob' });
  }

  getEditingUser(): Observable<User | null> {
    return this.editingUser.asObservable();
  }

  setEditingUser(user: User | null) {
    this.editingUser.next(user);
  }
}
