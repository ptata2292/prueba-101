import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirlineErrorService {

  errors: Array<{value: string}>;
  warnings: Array<{value: string}>;
  generalErrors: Array<{value: string}>
  showErrorInfo: boolean;

  constructor() { }

  showErrors(errors, warnings, generalErrors){
    this.errors = errors;
    this.warnings = warnings;
    this.generalErrors = generalErrors;
    this.showErrorInfo = true;
  }

  hideErrors(){
    this.showErrorInfo = false;
    this.warnings = [];
    this.errors = [];
    this.generalErrors = [];
  }
}
