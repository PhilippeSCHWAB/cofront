
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { Location } from '@angular/common';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn = false;

  isReader: boolean;
  isCreator: boolean;
  isAdmin: boolean;

  menuForm = new FormControl('', [
    Validators.required,

  ]);

  private nomdelabdd: string; // Alim 4 bases par variable


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  constructor(
    private breakpointObserver: BreakpointObserver,
    private loginService: AuthenticationService,
    private location: Location) { }

  ngOnInit() {
    this.loginService.userAdminRoles.subscribe(userRoles => {
      this.isLoggedIn = false, error => console.log(error + 'erreur lors du subscribe 43');

      this.isReader = userRoles.includes('ROLE_READER');
      //console.log(  this.isReader )
      this.isCreator = userRoles.includes('ROLE_CREATOR');
      //    console.log( this.isCreator )
      this.isAdmin = userRoles.includes('ROLE_ADMIN');
      //  console.log(  this.isAdmin  )


      if (userRoles && userRoles.length > 0) {
        this.isLoggedIn = true;
      }
    });
  }

  onSelectMenu(menuFormvalue) {
  }

  logOut() {
    //  alert("ffff")
    this.loginService.logOut();

  }

}


