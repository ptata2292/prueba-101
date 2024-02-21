import { Router } from '@angular/router';
import { Golf } from '../../../golf';
import { LoginService } from '../../../../auth/login/login.service';
import { config } from '../../../../../../shared/config';

export class GolfItem extends Golf {

  constructor(protected router: Router, loginService: LoginService) {
    super(loginService);
  }
}
