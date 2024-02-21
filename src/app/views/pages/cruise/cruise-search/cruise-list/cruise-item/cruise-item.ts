import { Router } from '@angular/router';
import { Cruise } from '../../../cruise';
import { LoginService } from '../../../../auth/login/login.service';
import { config } from '../../../../../../shared/config';

export class CruiseItem extends Cruise {

  constructor(protected router: Router, loginService: LoginService) {
    super(loginService);
  }
}
