import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  currentUser: User;
  users: User[];
  userSubcription: Subscription;
  // dataSource = new MatTableDataSource<User>(this.users);
  displayedColumns: string[] = ['firstName', 'lastName', 'actions'];


  constructor(authenticationService: AuthenticationService, private userService: UserService, private alertService: AlertService) {
    this.userSubcription = authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.users = [];
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }

  deleteUser(id: string) {
    if (window.confirm("Are you sure want to delete this customer?")) {
      if (this.currentUser.id != id) {
        this.userService.delete(id).pipe(first()).subscribe(data => {
          this.loadAllUsers()
        }, error => {
          if (error.status === 406) {
            this.alertService.error("Customer cannot be deleted. It exists in an order");
          }
        });
      } else {
        this.alertService.error('Customer cannot be deleted', false);
      }
    }
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
      //this.dataSource = users;
    });
  }

  isUsersEmpty(): boolean {
    return this.users.length > 0;
  }

}
