import { LoginService } from '../views/pages/auth/login/login.service';
import { action, mode, securityCode } from '../core/security.model';
import { config } from '../shared/config';

export class security {
    constructor(protected loginService: LoginService){ }

    public acl(object, objectType, mode, action){
        const user = this.loginService.getUserSession();
        const acl = object.acl;
        var aclObj = [];
        aclObj = acl.filter(x => x.objectType == objectType);
        if(aclObj.length == 0){
            aclObj = acl.filter(x => x.objectType == '*');
        }
        if(aclObj.length > 0){
            return aclObj[0].securityCode;
        } else {
            return securityCode.NONE;
        }
    }

    public aclEdit(object) : boolean {
        const acl = object.acl || [];
        for(const a of acl){
            if(a.securityCode > 3){
                return true;
            }
        }
        return false;
    }
}
