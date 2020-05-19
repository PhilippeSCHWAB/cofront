import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {BehaviorSubject} from 'rxjs';
import { UserAdmin } from '../interface/useradmin.model';
import { JsonWebToken } from '../interface/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userAdminRoles: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient, private router: Router) {
    this.getUserAdminRoles();
  }

  public get loggedIn(): boolean {
    return sessionStorage.getItem(environment.accessToken) !== null;
  }

  logIn(userAdmin: UserAdmin) {
    this.httpClient.post<JsonWebToken>(environment.apiUrl + 'users/sign-in', userAdmin).subscribe(
      token => {
        sessionStorage.setItem(environment.accessToken, token.token);

        this.getUserAdminRoles();
//alert( this.getUserAdminRoles());
        this.router.navigate(['']);
      },
      error => console.log('Error while login'));
  }

  logOut() {
    sessionStorage.removeItem(environment.accessToken);
    this.userAdminRoles.next([]);
    this.router.navigate(['login']);
  }

  private getUserAdminRoles() {
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      const authorities: Array<any> = decodedToken.auth;
      this.userAdminRoles.next(authorities.map(authority => authority.authority));
    }
  }
}
