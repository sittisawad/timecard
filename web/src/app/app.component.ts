import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredential } from './auth/login.credential';
import { LoginService } from './auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  isLoginPage = false;

  isLogin$?: Observable<LoginCredential | null>;

  constructor(private readonly loginService: LoginService) {}

  ngOnInit(): void {
    this.isLogin$ = this.loginService.getLoginToken();
  }


  onLogout() {
    this.loginService.logout();
  }
}
