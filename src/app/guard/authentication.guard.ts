import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {LoginService} from '../views/pages/auth/login/login.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private myRoute: Router, private loginService:LoginService){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let auth = this.loginService.getLogggedInStatus();
      if (auth == true) {
        return true;
      } else {
        this.myRoute.navigate(["login"]);
        return false;
      }
  }

}
