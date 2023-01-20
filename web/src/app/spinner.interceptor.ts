import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ACCESS_TOKEN_KEY } from './consts/login.consts';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly spinnerService: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();
    return next.handle(this.appendToken(request)).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          this.spinnerService.hide();
        }
      })
    );
  }

  appendToken(request: HttpRequest<any>) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + <string>token,
        },
      });
    }

    return request;
  }
}
