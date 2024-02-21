import { Router } from '@angular/router';
import { Transportation } from '../../../transportation';
import { LoginService } from '../../../../auth/login/login.service';
import { config } from '../../../../../../shared/config';

export class TransportationItem extends Transportation {

  constructor(protected router: Router, loginService: LoginService) {
    super(loginService);
  }
}
