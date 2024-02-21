import { Router } from '@angular/router';
import { Rail } from '../../../rail';
import { LoginService } from '../../../../auth/login/login.service';
import { config } from '../../../../../../shared/config';

export class RailItem extends Rail {

  constructor(protected router: Router, loginService: LoginService) {
    super(loginService);
  }
}
