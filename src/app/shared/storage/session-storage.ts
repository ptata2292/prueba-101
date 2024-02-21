import { Injectable } from '@angular/core';
import { EncrDecrService } from '../services/EncrDecr.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorage implements Storage {
  length: number;

  constructor(private encrypt: EncrDecrService) {}

  public clear(): void {
    sessionStorage.clear();
  }

  public check(key: string): boolean {
    return sessionStorage.getItem(key) == (undefined || null) ? false : true;
  }

  public getItem(key: string): string {
    let data = sessionStorage.getItem(key);
    if(data == (undefined || null)){
      return data;
    }
    data = this.encrypt.AESDecrypt(data);
    return data;
  }

  public key(index: number): string {
    return sessionStorage.key(index);
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public setItem(key: string, data: string): void {
    data = this.encrypt.AESEncrypt(data);
    sessionStorage.setItem(key, data);
  }
}
