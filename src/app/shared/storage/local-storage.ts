import { Injectable } from '@angular/core';
import { EncrDecrService } from '../services/EncrDecr.service';

@Injectable()
export class LocalStorage implements Storage {
  public keys = {
    airline: {
      selectedRlocId: "selectedRlocId",
      search: "airlineSearch",
      offerViewModel: "airlineOfferViewModel",
    }
  }


  length: number;

  constructor(private encrypt: EncrDecrService) {}

  public clear(): void {
    localStorage.clear();
  }

  public check(key: string): boolean {
    return localStorage.getItem(key) == (undefined || null) ? false : true;
  }

  public getItem(key: string): string {
    let data = localStorage.getItem(key);
    if(data == (undefined || null)){
      return data;
    }
    data = this.encrypt.AESDecrypt(data);
    return data;
  }

  public key(index: number): string {
    return localStorage.key(index);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public setItem(key: string, data: string): void {
    data = this.encrypt.AESEncrypt(data);
    localStorage.setItem(key, data);
  }
}
