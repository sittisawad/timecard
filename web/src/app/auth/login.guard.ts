import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, firstValueFrom, map, Observable, of, take } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.loginService.getLoginToken().pipe(
      map((token) => {
        if (token) {
          return true;
        }

        throw new Error();
      }),
      catchError((_) => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );
  }
}
