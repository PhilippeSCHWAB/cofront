import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {UserAdmin} from '../../interface/useradmin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(255)])
    ]
  });

  constructor(private fb: FormBuilder, private loginService: AuthenticationService) {
  }

  onSubmit() {
   // alert('ddddd');

    const userAdmin = new UserAdmin();
    userAdmin.username = this.loginForm.value.username;
    userAdmin.password = this.loginForm.value.password;
   // alert(userAdmin.username+'+'+userAdmin.password);

    this.loginService.logIn(userAdmin);
  }
}
