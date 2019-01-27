import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators'


import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  getById(id: string) {
    return this.http.get<User>(this.apiUrl + '/users/' + id);
  }

  register(user: User) {
    return this.http.post(this.apiUrl + '/users/register', user);
  }

  update(user: User, userId: string) {
    return this.http.put(this.apiUrl + '/users/' + userId, user);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl + '/users/' + id);
  }

  validateUserPhone(phone: string) {
    return this.http.post(this.apiUrl + '/users/validate/phone', phone);
  }

  validateUserEmail(email: string) {
    return this.http.post(this.apiUrl + '/users/validate/email', email);
  }

  validateUserUsername(username: string) {
    return this.http.post(this.apiUrl + '/users/validate/username', username);
  }


}
