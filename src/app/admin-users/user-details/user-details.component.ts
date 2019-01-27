import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Route, ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  userForm: FormGroup;
  formBuilder = new FormBuilder();
  userId: string;
  submitted = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private routeActivated: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userId = this.routeActivated.snapshot.paramMap.get("id");
    this.findUser(this.userId);
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required, this.validateUserPhone()],
      email: ['', Validators.compose([Validators.required, Validators.email]), this.validateUserEmail()]
    })
  }

  get f() { return this.userForm.controls }

  findUser(id: string) {
    this.userService.getById(id).subscribe(
      data => {
        this.user = data;
        this.userForm.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          password: data.password,
          phone: data.phone,
          email: data.email
        })
      }, error => {
        this.alertService.error(error);
      })
  }

  updateUser() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return;
    }
    this.user.firstName = this.userForm.get('firstName').value;
    this.user.lastName = this.userForm.get('lastName').value;
    this.user.email = this.userForm.get('email').value;
    this.user.phone = this.userForm.get('phone').value;
    this.user.password = this.userForm.get('password').value;
    this.userService.update(this.user, this.userId).subscribe(
      data => {
        this.alertService.success("User updated successfully");
        this.router.navigate(["/admin/users"]);
      }, error => {
        this.alertService.error(error);
      })
  }

  validateUserPhone(): ValidatorFn {
    return (control: AbstractControl) => {
      return this.userService.validateUserPhone(control.value).pipe(catchError(error => {
        if (control.value != this.user.phone) {
          control.setErrors({ exists: true });
          return throwError(error);
        } else {
          control.setErrors(null);
          return [];
        }
      }));
    }
  }

  validateUserEmail(): ValidatorFn {
    return (control: AbstractControl) => {
      return this.userService.validateUserEmail(control.value).pipe(catchError(error => {
        if (control.value != this.user.email) {
          control.setErrors({ exists: true });
          return throwError(error);
        } else {
          control.setErrors(null);
          return [];
        }
      }));
    }
  }

}
