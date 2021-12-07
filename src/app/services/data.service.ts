import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_SERVER = "http://52.91.17.221:8800/";

  constructor(private httpClient: HttpClient) { }


  get(url){
    return this.httpClient.get(this.API_SERVER + url).pipe(retry(3), catchError(this.handleError));
  }

  post(url, data) {
    return this.httpClient.post(this.API_SERVER + url, data).pipe(retry(3), catchError(this.handleError))
  }

  private handleError(error: any) {
    return throwError(error.error);
  }
}
