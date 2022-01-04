import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  errorObj: any;

  constructor(private token: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // let authReq = request;
    // const token = this.token.getToken();
    // if (token != null) {
    //   authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    // }


    if(localStorage.getItem(`${environment.appName}`+'_user')){
      let token = localStorage.getItem(`${environment.appName}`+'_user');
       if (token) {
         request = request.clone({
             setHeaders: { 
                 Authorization: `Bearer ${token}`
             }
         });
     }

     }

    return next.handle(request).pipe(
      catchError((_errorResponse: HttpErrorResponse) => {
       if (this.errorObj instanceof HttpErrorResponse) {
        if (this.errorObj.status === 0) {
          return throwError('Unable to Connect to the Server');
        }
       }
      })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
