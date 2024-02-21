import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirlineLoaderService {
  public isLoading: boolean;
  public isSearchResultLoading: boolean;
  public loaderText: string;

  constructor() { }

  isLoaderShown(){
    return this.isLoading;
  }

  isLoaderHidden(){
    return !this.isLoading;
  }

  showLoader(text?: string){
    this.isLoading = true;
    this.loaderText = text || "";
  }

  hideLoader(){
    this.isLoading = false;
  }

  showSearchResultLoader(text?: string){
    this.isSearchResultLoading = true;
    this.loaderText = text || "";
  }
  
  hideSearchResultLoader(){
    this.isSearchResultLoading = false;
  }

  isSearchResultLoaderShown(){
    return this.isSearchResultLoading;
  }

  isSearchResultLoaderHidden(){
    return !this.isSearchResultLoading;
  }
}
