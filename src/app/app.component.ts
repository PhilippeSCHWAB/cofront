import { Component } from '@angular/core';
import { UserComponent } from './adduser/adduser.component';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DiligneSE Admin';
}


const routes: Routes = [
  {
 //   path: 'user/:user.iud',
  //  component: UserComponent
  },

];
