import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { ACCESS_TOKEN_KEY } from '../consts/login.consts';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:3000/';

  private loginTokenSubject = new BehaviorSubject<LoginResponseDto | null>(
    null
  );
  private loginToken$ = this.loginTokenSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  login(cred: LoginModel) {
    return this.http.post<LoginResponseDto>(this.baseUrl + 'login', cred).pipe(
      map((res) => {
        if (res) {
          this.loginTokenSubject.next(res);
          localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
        }
      })
    );
  }

  logout() {
    this.loginTokenSubject.next(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  getLoginToken() {
    return this.loginToken$;
  }
}
