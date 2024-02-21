import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})

export class EncrDecrService {
  constructor() { }

  // The set method is use for encrypt the value.
  AESEncrypt(value, key?: string) {
    key = key || config.encryptionKey;
    const keyvalue = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), keyvalue,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  // The get method is use for decrypt the value.
  AESDecrypt(value, key?: string) {
    key = key || config.encryptionKey;
    const keyValue = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.enc.Utf8.parse(key);
    const decrypted = CryptoJS.AES.decrypt(value, keyValue, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
