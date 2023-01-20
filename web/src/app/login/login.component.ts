import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, take, tap } from 'rxjs';
import { LoginService } from '../auth/login.service';
import { LoginForm } from './login-form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //#region Form
  public loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    email: new FormControl<string>('sittisawad@mail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('P@ssw0rd', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public get email() {
    return this.loginForm.get('email') as FormControl<string>;
  }

  public get password() {
    return this.loginForm.get('password') as FormControl<string>;
  }
  //#endregion

  constructor(
    private readonly loginService: LoginService,
    private readonly messageService: NzMessageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.restore();
    this.loginService
      .getLoginToken()
      .pipe(
        take(1),
        tap((data) => {
          if (data) this.router.navigate(['/welcome']);
        })
      )
      .subscribe();
  }

  submitLogin() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.loginService
        .login({
          email: this.email.value,
          password: this.password.value,
        })
        .pipe(
          tap(() => {
            this.router.navigate(['/welcome']);
          }),
          catchError((err) => {
            this.loginForm.reset();
            this.messageService.error('Invalid email or password!');
            return err;
          })
        )
        .subscribe();
    }
  }
}
