import { Component, OnInit } from '@angular/core';
import { config } from '../../../shared/config';
import { LoginService } from '../../pages/auth/login/login.service';
import { Router, Event, NavigationEnd } from '@angular/router';

import { getLogo, getAuthorizedModules, getTotalModels } from '../../../shared/tenant/tenant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public objectRouting = config.objectRouting;
  public linkSelected; // = this.objectRouting.Flights.URLLink;
  public accessModels = [];
  public totalModels = [];
  public releaseDate: string;
  public version: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.releaseDate = environment.releaseDate;
    this.version = environment.version;
    this.accessModels = getAuthorizedModules();
    this.totalModels = getTotalModels();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const urlSplitArr = event.url.split("/");
        if(urlSplitArr.length > 0) {
          this.linkSelected = urlSplitArr[1] == "" ? this.objectRouting.Flights.URLLink : urlSplitArr[1];
        }
      }
    });
  }

  getObjectRouting(URLLink) {
    for(let objectRoutingObj in config.objectRouting) {
      if(config.objectRouting[objectRoutingObj].URLLink == URLLink) {
        return config.objectRouting[objectRoutingObj];
      }
    }
  }

  ngOnInit(): void {
  }

  get getLogo() {
    return getLogo;
  }

  Logout() {
    this.loginService.deleteUserSession("hotelsTokenName");
    this.router.navigateByUrl('/login');
  }

}
