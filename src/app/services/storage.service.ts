import { Injectable } from '@angular/core';
import * as CryptoTS from 'crypto-ts';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private cookie: CookieService
  ) { }

  static isCreating = false;
  static instance: StorageService;

  TEMP = {
    KEY: 'iwont_t',
    PASSWORD: '90590348534Yiwont!@#iwontYIU!@00',
  };

  USER = {
    KEY: 'iwont_u',
    PASSWORD: '!iwont##0895*(iwont)?:}95047834&&tes',
    EXPIRY: .5
  };

  REMEMBAR = {
    KEY: 'iwont_r',
    PASSWORD: '!iwont##0895*(iwont_Remambar!#123)?:}95047834&&tes',
    EXPIRY: 7
  };


  static getInstance() {
    if (StorageService.instance == null) {
      StorageService.isCreating = true;
      StorageService.instance = new StorageService(this.bind(this.call));
      StorageService.isCreating = false;
    }
    return StorageService.instance;
  }


  public encription(data: any, secret: string) {
    return CryptoTS.AES.encrypt(JSON.stringify(data), secret).toString()
      .replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l');
    // .replace('+', 'HELOOOOOOOO').replace('/', 'Por21Ld').replace('=', 'Ml32');
  }
  public decription(data: any, secret: string) {
    const bytes = CryptoTS.AES.decrypt(data.toString()
      .replace(/p1L2u3S/g, '+').replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '='), secret);
    return JSON.parse(bytes.toString(CryptoTS.enc.Utf8));
  }

  setTempData(ID: any) {
    return this.cookie.set(this.TEMP.KEY, this.encription(ID, this.TEMP.PASSWORD));
  }



  getTempData() {
    const DATA = this.cookie.get(this.TEMP.KEY) !== null ? this.cookie.get(this.TEMP.KEY) : undefined;
    if (DATA && DATA !== undefined) {
      return this.decription(DATA, this.TEMP.PASSWORD);
    } else {
      return undefined;
    }
  }
  clearTempData() {
    return this.cookie.delete(this.TEMP.KEY);
  }

  setUser(data: any) {
    return this.cookie.set(this.USER.KEY, this.encription(data, this.USER.PASSWORD), this.USER.EXPIRY);
  }

  setUserRemembar(data: any) {
    return this.cookie.set(this.USER.KEY, this.encription(data, this.USER.PASSWORD), this.REMEMBAR.EXPIRY);
  }

  getUser() {
    const DATA = this.cookie.get(this.USER.KEY) !== null ? this.cookie.get(this.USER.KEY) : undefined;
    if (DATA && DATA !== undefined) {
      return this.decription(DATA, this.USER.PASSWORD);
    } else {
      return undefined;
    }
  }

  clearUser() {
    return this.cookie.delete(this.USER.KEY);
  }
  // TOKEN
  getDataField(type: string) {
    if (this.getUser() !== undefined && this.getUser()[type] !== undefined) {
      return this.getUser()[type];
    } else {
      return undefined;
    }
  }

  isAuthenticate() {
    if (this.getDataField('token') !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  isVerified() {
    if (this.getDataField('verified') !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  setUserDataField(type: string, data: any) {
    const oldData = this.getUser();
    if (oldData !== undefined) {
      oldData[type] = data;
      this.setUser(oldData);
    }
  }

  setRememberUserDataField(type: string, data: any) {
    const oldData = this.getUser();
    if (oldData !== undefined) {
      oldData[type] = data;
      this.setUserRemembar(oldData);
    }
  }

}
