import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Injectable()
export class ReaderGuard implements CanActivate {

  constructor(private router: Router, private loginService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.loginService.loggedIn) {
      this.router.navigate(['login']);
      return false;
    } else if (this.loginService.userAdminRoles.getValue().includes('ROLE_READER')) {
      return true;
    }

    return false;
  }
}
