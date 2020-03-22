import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DiligneSE Admin';
}

/*
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';


import { FormlistComponent } from './formlist/formlist.component';

import { JeuComponent } from './jeu/jeu.component';
import { EditeurComponent } from './editeur/editeur.component';
*/
const routes: Routes = [
  {
    path: 'user/:user.iud',
    component: UserComponent
  },

];
/*
{
  path: 'timeline/:timeline.id',
  component: TimelineManagerComponent
},



  { path: 'jeu/:id', component: JeuComponent},
  { path: 'editeur', component: EditeurComponent},



{
  path: 'timeline/:timeline.id',
  component: TimelineManagerComponent
},

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myfront';
}
*/
