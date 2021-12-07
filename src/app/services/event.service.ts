import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor( private storage: StorageService ) { }
  showHeader = new Subject<boolean>();


  private Loading = new BehaviorSubject(true);
  isLoading = this.Loading.asObservable();

  private Login = new BehaviorSubject(this.storage.isAuthenticate());
  isLogin = this.Login.asObservable();
  Location: EventEmitter<object> = new EventEmitter();
  isHttpRequest = new Subject<boolean>();

  private tempEmmit = new BehaviorSubject(false);
  isTempEmmit = this.tempEmmit.asObservable();

  private verified = new BehaviorSubject(this.storage.isVerified());
  isVerified = this.Login.asObservable();


  setVerifiedEmmit(isVerified: boolean) {
    return this.verified.next(isVerified);
  }


  setTempEmmit(isEmmeted: any) {
    return this.tempEmmit.next(isEmmeted);
  }

  setLoginEmmit(isLogin: boolean) {
    return this.Login.next(isLogin);
  }


  setLoaderEmmit(isLoading: boolean) {
    return this.Loading.next(isLoading);
  }

  setLocationEmmit(data) {
    return this.Location.emit(data);
  }

  getLocationEmmit() {
    return this.Location;
  }
}
