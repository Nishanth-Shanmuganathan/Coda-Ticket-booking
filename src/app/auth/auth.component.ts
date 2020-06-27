import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Auth } from '../models/auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  signinForm: FormGroup;
  signupForm: FormGroup;
  passwordMatch = false;

  helperFirstUser = false;
  helperStatus = 'pristine';
  helperServerError: String;
  helperPasswordVisible = false;
  helperConfirmPasswordVisible = false;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('token')
    this.authService.loggedIn.next(null)

    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ])
    });

    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
    });
  }

  checkMatch() {
    if (
      this.signupForm.value.password !== this.signupForm.value.confirmPassword
    ) {
      this.signupForm.get('confirmPassword').setErrors({ invalid: true });
    }
  }

  onSubmit() {
    this.helperStatus = 'loading';
    if (this.signinForm.invalid) {
      this.helperStatus = 'pristine';
      return;
    }
    const loginCredentials: Auth = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password,
    };
    this.authService.loginUser(loginCredentials).subscribe(
      (res) => {
        this.helperStatus = 'pristine';
        if (res.token) {
          this.route.navigate(['home']);
        }
      },
      (err) => {
        this.helperStatus = 'pristine';
        this.helperServerError = this.authService.errorHandler(err);
      }
    );
  }

  onSignup() {
    this.helperStatus = 'loading';
    if (this.signupForm.invalid) {
      this.helperStatus = 'pristine';
      return;
    }
    const regCredentials: Auth = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword,
    };
    this.authService
      .registerUser(regCredentials)
      .subscribe(
        (res) => {
          this.helperStatus = 'pristine';
          if (res.token) {
            this.route.navigate(['home']);
          }
        },
        (err) => {
          this.helperStatus = 'pristine';
          this.helperServerError = this.authService.errorHandler(err);
        }
      );
  }

  toggleUser() {
    this.helperFirstUser = !this.helperFirstUser;
  }
}
