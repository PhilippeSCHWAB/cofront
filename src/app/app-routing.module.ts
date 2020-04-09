import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ChainComponent } from './chain/chain.component';
import { UserListComponent } from './userlist/userlist.component';
import { ChainlistComponent } from './chainlist/chainlist.component';
import { MenuComponent } from './menu/menu.component';
import { AlimbddvarComponent } from './alimbddvar/alimbddvar.component';
import { BddlistparamComponent } from './bddlistparam/bddlistparam.component';
import {EntitylistComponent} from './entitylist/entitylist.component';
import {AlimentityComponent} from './alimentity/alimentity.component';

import {AlimoutildetestComponent} from './alimoutildetest/alimoutildetest.component';
import { OutilDeTestlistComponent } from './outildetestlist/outildetest.component';

import { AlimserveurunixComponent} from './alimserveurunix/alimserveurunix.component';
import { ServeurunixlistComponent } from './serveurunixlist/serveurunixlist.component';

const routes: Routes = [

   { path: '', component: MenuComponent},

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
