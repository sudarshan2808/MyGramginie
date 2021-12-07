import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { EventService } from './event.service';
import { User } from '../user';
import { environment } from 'src/environments/environment';
import { AuthService, LoaderService } from '../app.service';
import { API } from '../config';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  // API_URL = 'http://52.91.17.221:8800/'

  API_URL: string;
  httpOptions: { headers: HttpHeaders; };
  TOKEN: string;
  ROLE: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private loader: LoaderService,
    private storage: StorageService,
    private event: EventService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.TOKEN = this.storage.getDataField('token');
    this.ROLE = this.storage.getDataField('role');

    this.event.isLogin.subscribe((res: boolean) => {
      this.TOKEN = this.storage.getDataField('token');
      this.ROLE = this.storage.getDataField('role');
      this.setHeader();
    });
  }


  setHeader() {
    if (this.TOKEN !== undefined) {
      this.httpOptions = {
        headers: new HttpHeaders({
        //   'Content-Type': 'application/json',
          Accept: 'multipart/form-data',
          //'x-access-token': this.TOKEN
          Authorization: 'Bearer' + this.TOKEN
        })
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
        //   'Content-Type': 'application/json',
          Accept: 'multipart/form-data',
        })
      };
    }
  }


  createAuthorizationHeader(headers: Headers) {
    let token = localStorage.getItem('tokenś');
    headers.append("Cache-Control", "no-cache, no-store, must-revalidate");
    headers.append("Pragma", "no-cache");
    headers.append("Expires", "0");
    if (!token) return;
    headers.append('Authorization', token); 
}

 handleError(error) {
     if (error.status === 401) {
         if (this.auth.isLoggedIn()) {
             // this.toastr.error('Access Denied!', 'Unauthorized');
             this.auth.logout();
         }
     }
     this.loader.stop();
     return Observable.throw(error);
 }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()) {
    return this.http.get(`${this.API_URL}${path}`, { headers: this.httpOptions.headers, params })
      .pipe(catchError(this.formatErrors));
  }

  post(path: any, body: object = {}) {
    return this.http.post(`${this.API_URL}${path}`, body, this.httpOptions).pipe(catchError(this.formatErrors));
  }


//   post(url, data, extraHeader?: Headers) {
//     let headers = !(extraHeader) ? new Headers() : extraHeader;
//     this.createAuthorizationHeader(headers);
//     return this.http.post(API+url, data, { headers: headers })
//         .map(res => res.json())
//         .catch(error => this.handleError(error));
// }

//   addUser(body): Observable<any> {

//     const customHeaders = new HttpHeaders({
//         'authenticationKey' : 'testing2323'
//     });

//    return this.http.post('http://52.91.17.221:8800/userregister', body)
// }



  // users() {
  //   return this.http.get(this.API_URL);
  // }

  // saveUser(data: any) {
  //   return this.http.post(this.API_URL, data)
  // }

}


