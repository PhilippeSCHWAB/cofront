import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './adduser/adduser.component';
import { ChainComponent } from './addchain/addchain.component';
import { UserListComponent } from './userlist/userlist.component';
import { ChainlistComponent } from './listchain/listchain.component';
import { MenuComponent } from './menu/menu.component';
import { AlimbddvarComponent } from './addaccesstochain/addaccesstochain.component';
import { BddlistparamComponent } from './listbdd/listbdd.component';
import {EntitylistComponent} from './listentity/entitylist.component';
import {AlimentityComponent} from './addentity/addentity.component';

import {AlimoutildetestComponent} from './addtesttool/alimoutildetest.component';
import { OutilDeTestlistComponent } from './listtesttool/listtesttool.component';

import { AlimserveurunixComponent} from './addunixserver/addunixserver.component';
import { ServeurunixlistComponent } from './listserverunix/listserverunix.component';

import { UserchainComponent } from './listuserchain/listuserchain.component';
import { TopBarComponent } from './top-bar/top-bar.component';


const routes: Routes = [
{ path: '', component: TopBarComponent},

 //  { path: '', component: MenuComponent},

  { path: 'userlist', component: UserListComponent },
  { path: 'user/:user.id', component: UserComponent},
  { path: 'newuser', component: UserComponent},

  { path: 'chain', component: ChainComponent},
  { path: 'chain/:chain.id', component: ChainComponent},
  { path: 'chainlist', component: ChainlistComponent},

  { path: 'bddList', component: BddlistparamComponent},
  { path: 'bdd/:bdd.id', component: AlimbddvarComponent},
  { path: 'newbdd',  component: AlimbddvarComponent},

  { path: 'entityList', component: EntitylistComponent},
  { path: 'entity/:entity.id', component: AlimentityComponent},
  { path: 'newentity',  component: AlimentityComponent},

  { path: 'outildetestList', component: OutilDeTestlistComponent},
  { path: 'outildetest/:outildetest.id', component: AlimoutildetestComponent},
  { path: 'newoutildetest',  component: AlimoutildetestComponent},

  { path: 'serveurunixList', component: ServeurunixlistComponent},
  { path: 'serveurunix/:serveurunix.id', component: AlimserveurunixComponent},
  { path: 'newserveurunix',  component: AlimserveurunixComponent},


  { path: 'userchain', component: UserchainComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
