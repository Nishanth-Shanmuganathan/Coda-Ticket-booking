import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Auth } from './../models/auth.model';
import { environment} from './../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  loggedIn = new Subject<string>();

  constructor(public http: HttpClient, private router: Router) {}

  public registerUser(auth: Auth) {
    
    return this.http
      .post<{ token: string }>(
        environment.server_url + 'authentication/register',
        auth
      )
      .pipe(
        tap((res) => {
          this.token = res.token;
          localStorage.setItem('token', this.token);
          this.loggedIn.next(this.token);
        })
      );
  }

  public loginUser(auth: Auth) {
    return this.http
      .post<{ token: string}>(
        environment.server_url + 'authentication/login',
        auth
      )
      .pipe(
        tap((res) => {
          this.token = res.token;
          localStorage.setItem('token', this.token);
          this.loggedIn.next(this.token);
        })
      );
  }

  public getToken() {
    this.token = localStorage.getItem('token');
    this.loggedIn.next(this.token);
  }

  // public logout() {
  //   this.token = null;
  //   localStorage.removeItem('token');
  //   this.loggedIn.next([this.token, this.admin]);
  //   if (!this.admin && !this.token) {
  //     this.router.navigate(['/auth']);
  //   }
  // }

  public errorHandler(err) {
    if (err.error.message === 'AUTHENTICATION_DENIED') {
      return 'Email Id or Password incorrect...';
    } else if (err.error.message === 'PASSWORD_MISMATCH') {
      return 'Passwords mismatch...';
    } else if (err.error.message === 'EMAIL_ALREADY_EXISTS') {
      return 'Email Id already exists...';
    } else if (err.error.message === 'ERROR_IN_FETCHING_DATA') {
      return 'Error loading resource..';
    } else if (err.status === 500) {
      return 'Oops..Something wrong with servers...';
    } else {
      return 'An unknown error occurred...';
    }
  }
}
