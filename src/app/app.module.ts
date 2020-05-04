

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
import { ChainComponent } from './addchain/addchain.component';
import { AppRoutingModule } from './app-routing.module'; //TODO: ajouter routing

import { UserComponent } from './adduser/adduser.component';
import { UserListComponent } from './userlist/userlist.component';
import { ChainlistComponent } from './listchain/listchain.component';
import { MenuComponent } from './menu/menu.component';
import { UserchainComponent } from './listuserchain/listuserchain.component';


///// menu déroulant ////
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';

///// filtres ////
import { FilterItemDirective } from './filter-item.directive';

import { AlimbddvarComponent } from './addaccesstochain/addaccesstochain.component';
import { BddlistparamComponent } from './listbdd/listbdd.component';


import {AlimentityComponent} from './addentity/addentity.component';
import {EntitylistComponent} from './listentity/entitylist.component';

import { AlimoutildetestComponent } from './addtesttool/alimoutildetest.component';
import { OutilDeTestlistComponent } from './listtesttool/listtesttool.component';


import {AlimserveurunixComponent} from './addunixserver/addunixserver.component';
import {ServeurunixlistComponent} from './listserverunix/listserverunix.component';




@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ChainlistComponent,
    UserComponent,
    ChainComponent,
    UserListComponent,
    UserchainComponent,
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

