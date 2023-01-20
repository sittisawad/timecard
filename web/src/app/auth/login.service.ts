import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Buffer } from 'buffer';

import { ACCESS_TOKEN_KEY } from '../consts/login.consts';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { LoginModel } from '../models/login.model';
import { LoginCredential } from './login.credential';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:3000/';

  private loginTokenSubject = new BehaviorSubject<LoginCredential | null>(null);
  private loginToken$ = this.loginTokenSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly routerService: Router
  ) {}

  login(cred: LoginModel) {
    return this.http.post<LoginResponseDto>(this.baseUrl + 'login', cred).pipe(
      tap((res) => {
        if (res) {
          const payload = JSON.parse(
            Buffer.from(
              <string>res.access_token.split('.').at(1),
              'base64'
            ).toString('utf8')
          );

          this.loginTokenSubject.next({
            id: payload.sub,
            email: payload.username,
            token: payload.access_token,
          });
          localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
        }
      })
    );
  }

  restore() {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      const payload = JSON.parse(
        Buffer.from(
          <string>localStorage.getItem(ACCESS_TOKEN_KEY)!.split('.').at(1),
          'base64'
        ).toString('utf8')
      );

      this.loginTokenSubject.next({
        id: payload.sub,
        email: payload.email,
        token: payload.username,
      });
    }
  }

  logout() {
    this.loginTokenSubject.next(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    this.routerService.navigate(['/login']);
  }

  getLoginToken() {
    return this.loginToken$;
  }
}
