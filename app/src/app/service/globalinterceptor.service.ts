import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalinterceptorService implements HttpInterceptor, CanActivate {
  constructor(private router: Router, private auth: AuthService) { }
  ignoretoken:Array<string>=["login","reg"];
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentReq = req;
    // currentReq = req.clone({setHeaders:{ 'mode' :'cors',"Content-Type": "application/json" }});
    // console.log("req",currentReq);
    if (this.auth.isAuthorized) {
      let token = this.auth.getToken();
      currentReq = req.clone({ setHeaders: { "Authorization": "Bearer " + token } });
    }
    else
      console.log("Global report Failed");
    return next.handle(currentReq).pipe(
      tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          if (ev.body && ev.body.error === 9999) {
            this.auth.setToken("");
            this.router.navigate([""]);
          }
        }
      }), catchError(response => {
        if (response instanceof HttpErrorResponse)
          console.log("Http Error Occured", response);
        return throwError(response);
      })
    )
  }
  canActivate(route: ActivatedRouteSnapshot): boolean{
    if (!(this.auth.isAuthorized()) && !this.ignoretoken.includes(window.location.href.split("/")[3])) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
