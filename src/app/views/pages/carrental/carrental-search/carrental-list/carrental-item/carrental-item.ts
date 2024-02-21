import { Router } from '@angular/router';
import { Carrental } from '../../../carrental';
import { LoginService } from '../../../../auth/login/login.service';
import { config } from '../../../../../../shared/config';

export class CarrentalItem extends Carrental {

  constructor(protected router: Router, loginService: LoginService) {
    super(loginService);
  }
}
