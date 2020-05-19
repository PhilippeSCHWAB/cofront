

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';

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


import {LoginComponent} from './components/login/login.component';
import {ReaderGuard} from './authentication/guards/reader.guard';
import {CreatorGuard} from './authentication/guards/creator.guard';
import {AdminGuard} from './authentication/guards/admin.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './authentication/http-interceptor/jwt.interceptor';

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

    LoginComponent,
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
  providers: [ReaderGuard, CreatorGuard, AdminGuard,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'warn' } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
    // Autres valeurs [primary,accent,warn]

  ]
  //  providers: [],

})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

