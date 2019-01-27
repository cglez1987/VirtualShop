import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { first, map, catchError } from 'rxjs/operators';

import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required, this.validateUserUsername()],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required, this.validateUserPhone()],
      email: ['', Validators.compose([Validators.required, Validators.email]), this.validateUserEmail()]
    }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.registerForm.get('email').errors);
      return;
    }
    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe()
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  validateUserPhone(): ValidatorFn {
    return (control: AbstractControl) => {
      return this.userService.validateUserPhone(control.value).pipe(catchError(error => {
        control.setErrors({ exists: true });
        return throwError(error);
      }));
    }
  }

  validateUserEmail(): ValidatorFn {
    return (control: AbstractControl) => {
      return this.userService.validateUserEmail(control.value).pipe(catchError(error => {
        control.setErrors({ exists: true });
        console.log(error);
        return throwError(error);
      }));
    }
  }

  validateUserUsername(): ValidatorFn {
    return (control: AbstractControl) => {
      return this.userService.validateUserUsername(control.value).pipe(catchError(error => {
        control.setErrors({ exists: true });
        return throwError(error);
      }));
    }
  }
}