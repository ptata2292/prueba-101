import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

export type trip = 'one' | 'round';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const invalidCtrl = !!(control && control.invalid);
      const invalidParent = !!(control && control.parent && control.parent.invalid);
      const errors = control.parent.errors;
      const controlName = this.getControlName(control);
      
      if(errors != null && errors.toFromMatch == true && controlName == 'to') {
        return true;
      } else if (errors != null && errors.startEndMatch == true && controlName == 'end') {
        return true;
      } else {
        return invalidCtrl && control.touched;
      }
    }
  
    getControlName(c): string | null {
      const formGroup = c.parent.controls;
      return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }
}