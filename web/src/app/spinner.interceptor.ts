import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, of } from 'rxjs';
import { ACCESS_TOKEN_KEY } from './consts/login.consts';
import { NgxSpinnerService } from 'ngx-spinner';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(
    private readonly spinnerService: NgxSpinnerService,
    private readonly modalService: NzModalService
  ) {}

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
      }),
      catchError((err) => {
        this.spinnerService.hide();
        this.modalService.error({
          nzTitle: 'Error!',
          nzContent: 'Server down!',
        });
        return of(err);
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
