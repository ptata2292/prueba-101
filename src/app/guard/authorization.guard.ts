import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { LoginService } from '../views/pages/auth/login/login.service';
import { getAuthorizedModules, getTotalModels, getTotalConfigModels } from '../shared/tenant/tenant';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  private totalModels: any[];
  private totalConfigModels: any[];

  constructor(private myRoute: Router, private loginService:LoginService) {
    this.totalModels = getTotalModels();
    this.totalConfigModels = getTotalConfigModels()
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const slashSplit = state.url.split("/");
      const accessModels = getAuthorizedModules(); // ["Airlines", "Hotels", "CarRental", "Golf", "Spa", "Rail", "Cruise", "Transportation"]
      if(slashSplit.length > 1) {
        const modelName = slashSplit[1];
        const result = accessModels.filter( (model) => model === modelName );
        if(result.length > 0){
          return true;
        } else if (modelName == "" || modelName == "/") {
          if(accessModels.length == 0){
            return this.myRoute.navigate(["login"]);
          } else {
            return this.myRoute.navigate([accessModels[0]]);
          }
        } else if(this.totalConfigModels.includes(modelName)) {
          return this.myRoute.navigate(["unauthorized"]);
        } else {
          return true;
        }
      }
      return true;
  }

  canActivateOld(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.loginService.getUserSession();
      const slashSplit = state.url.split("/");
      if(slashSplit.length > 1) {
        const modelName = slashSplit[1];
        //console.log(modelName);
        let accessModels = [];
        for(const accessModel in user.accessModels) {
          accessModels.push(accessModel);
        }
        const result = accessModels.filter( (model) => model === modelName );
        if(result.length > 0){
          return true;
        } else if (this.myRoute.url == "/login" || this.myRoute.url == "/") {
          if(accessModels.length == 0){
            alert('Access Denied to All Objects');
            // this.myRoute.navigate(["denied"]);
            return false;
          } else {
            alert(modelName + ' Access Denied');
            // this.myRoute.navigate(["denied"]);
            this.myRoute.navigate([accessModels[0]]);
          }
        } else {
          alert(modelName + ' Access Denied');
          // this.myRoute.navigate(["denied"]);
          return false;
        } 
      }
      return true;
  }

}
