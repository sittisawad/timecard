import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './auth/login.service';
import { LoginResponseDto } from './dtos/login-response.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  isLoginPage = false;

  isLogin$?: Observable<LoginResponseDto | null>;

  constructor(private readonly loginService: LoginService) {}

  ngOnInit(): void {
    this.isLogin$ = this.loginService.getLoginToken();
  }
}
