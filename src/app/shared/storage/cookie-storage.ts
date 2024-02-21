import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from '../services/EncrDecr.service';

@Injectable({
  providedIn: 'root'
})
export class CookieStorage implements Storage {
  length: number;

  constructor(private cookieService: CookieService, private encrypt: EncrDecrService) {}

  public clear(): void {
    this.cookieService.deleteAll();
  }

  public check(key: string): boolean {
    return this.cookieService.check(key);
  }

  public getItem(key: string): string {
    let data = this.cookieService.get(key);
    if(data == (undefined || null)){
      return data;
    }
    data = this.encrypt.AESDecrypt(data);
    return data;
  }

  public key(index: number): string {
    return this.cookieService.getAll().propertyIsEnumerable[index];
  }

  public removeItem(key: string, path = '/'): void {
    this.cookieService.delete(key, path);
  }

  public setItem(key: string, data: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'None' | 'Strict'): void {
    path = path || '/';
    data = this.encrypt.AESEncrypt(data);
    this.cookieService.set(key, data, expires, path, domain, secure, sameSite);
  }
}
