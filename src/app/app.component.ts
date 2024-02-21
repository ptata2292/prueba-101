import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { Title, DomSanitizer, SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { Observable, of } from 'rxjs';
import { debounceTime, distinct, filter, map, switchMap } from 'rxjs/operators';
import { tap, catchError } from 'rxjs/operators';

import { getTenantName, getLogo, getTitle, getTenantTheme } from './shared/tenant/tenant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {
  // title = 'Linkrez';
  favIcon: HTMLLinkElement;
  constructor(private titleService:Title, private sanitizer: DomSanitizer, private httpClient: HttpClient) {
    this.titleService.setTitle(getTitle());
    this.favIcon = document.querySelector('#favIcon');
    this.favIcon.href = getLogo(false, true);
    let tenantTheme = getTenantTheme();

    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('link');
    style.id = 'client-theme';
    style.rel = 'stylesheet';
    style.type = 'text/css';
    // style.href = 'assets/css/tenant/' + tenantTheme + ".css";
    console.log(style.href);
    this.getFolder(tenantTheme + ".css").subscribe((data: any) => {
      style.href = data;
      // console.log("data"+data);
      head.appendChild(style);
    });
    // style.href = 'http://localhost:4200/assets/css/tenant/linkrez.css';
    // const href = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200/assets/css/tenant/linkrez.css'); //Not Working 
  }

  getFolder(fileName: string): Observable<string> {
    const filePath = `assets/css/tenant/${fileName}`;
    return this.httpClient
      .get(`${filePath}`, { observe: 'response', responseType: 'blob' })
      .pipe(
        map(response => {
          // console.log('file name exists');
          return filePath;
        }),
        catchError(error => {
          // console.log('default');
          return of(`assets/css/tenant/default.css`);
        })
      );
  }
  
  ngAfterViewInit() {
    
  }
}
