import { Router } from '@angular/router';
import { Hotel } from '../../hotel';
import { LoginService } from '../../../auth/login/login.service';
import { config } from '../../../../../shared/config';

export class HotelItem extends Hotel {

  constructor(protected router: Router, loginService: LoginService) {
    super(loginService);
  }
}
