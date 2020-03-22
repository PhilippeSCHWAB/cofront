

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material';
import { ChainComponent } from './chain/chain.component';
import { AppRoutingModule } from './app-routing.module'; //TODO: ajouter routing

import { UserComponent } from './user/user.component';
import { UserListComponent } from './userlist/userlist.component';
import { ChainlistComponent } from './chainlist/chainlist.component';
import { MenuComponent } from './menu/menu.component';

///// menu déroulant ////
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';

///// filtres ////
import { FilterItemDirective } from './filter-item.directive';

import { AlimbddvarComponent } from './alimbddvar/alimbddvar.component';
import { BddlistparamComponent } from './bddlistparam/bddlistparam.component';


import {AlimentityComponent} from './alimentity/alimentity.component';
import {EntitylistComponent} from './entitylist/entitylist.component';

import { AlimoutildetestComponent } from './alimoutildetest/alimoutildetest.component';
import { OutilDeTestlistComponent } from './outildetestlist/outildetest.component';


import {AlimserveurunixComponent} from './alimserveurunix/alimserveurunix.component';
import {ServeurunixlistComponent} from './serveurunixlist/serveurunixlist.component';




@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ChainlistComponent,
    UserComponent,
    ChainComponent,
    UserListComponent,
    MenuComponent,//menu deroulant
    FilterItemDirective, AlimbddvarComponent,//fitre
    FilterItemDirective, BddlistparamComponent,//fitre

    FilterItemDirective, EntitylistComponent,//fitre
    FilterItemDirective, AlimentityComponent,//fitre

    FilterItemDirective, OutilDeTestlistComponent,//fitre
    FilterItemDirective, AlimoutildetestComponent,//fitre

    FilterItemDirective, AlimserveurunixComponent,//fitre
    FilterItemDirective, ServeurunixlistComponent,//fitre
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    DemoMaterialModule,
    BrowserAnimationsModule, //menu déroulant
    MatMenuModule,//menu déroulant
    MatButtonModule,//menu déroulant
    MatIconModule,//menu déroulant
    MatCardModule//menu déroulant
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
  // bootstrap: [],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'warn' } },
    // Autres valeurs [primary,accent,warn]

  ]
  //  providers: [],

})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

