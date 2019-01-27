import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private userService: UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.userService.apiUrl + '/users/authenticate', { username, password })
            .pipe(map(user => {
                console.log("Entrando al metodo de login: " + username + "/" + password);
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                } else {
                    throw "Username or password is incorrect!";
                }
            }), catchError(err =>{
                throw "Username or password is incorrect";
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.currentUserSubject.next(null);
    }

    getToken() {
        return this.http.get(this.userService.apiUrl + '/users/token');
    }

    public setCurrentUser(user: User){
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}