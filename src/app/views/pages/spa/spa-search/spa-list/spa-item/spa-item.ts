import { Router } from '@angular/router';
import { Spa } from '../../../spa';
import { LoginService } from '../../../../auth/login/login.service';
import { config } from '../../../../../../shared/config';

export class SpaItem extends Spa {

  constructor(protected router: Router, loginService: LoginService) {
    super(loginService);
  }
}
