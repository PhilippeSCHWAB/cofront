# Myfront

This project was generated with [Angular Cli] version 8.3.21.
Angular CLI: 8.3.25
Node: 12.16.2
OS: linux x64
Angular: 8.2.14
npm install -g @angular/cli

visual Studio Code 1.44.2

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.803.25
@angular-devkit/build-angular     0.803.25
@angular-devkit/build-optimizer   0.803.25
@angular-devkit/build-webpack     0.803.25
@angular-devkit/core              8.3.25
@angular-devkit/schematics        8.3.25
@angular/cli                      8.3.25
@ngtools/webpack                  8.3.25
@schematics/angular               8.3.25
@schematics/update                0.803.25
rxjs                              6.4.0
typescript                        3.5.3
webpack                           4.39.2


Angular.material
npm install -g @angular/cli

## launch

Run `ng serve` on the console. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Structure (cf App-Routing.ts) (Each component containts Create new..., Search by Id, list of items)
Home 
   	  { path: '', component: MenuComponent},

TABLES PRINCIPALES 
	User
		  { path: 'userlist', component: UserListComponent },
		  { path: 'user/:user.id', component: UserComponent},
		  { path: 'newuser', component: UserComponent},
	Chain
		  { path: 'chain', component: ChainComponent},
		  { path: 'chain/:chain.id', component: ChainComponent},
		  { path: 'chainlist', component: ChainlistComponent},


TABLES DE PARAMETTRAGE	
	Access aux chaines
		  { path: 'bddList', component: BddlistparamComponent},
		  { path: 'bdd/:bdd.id', component: AlimbddvarComponent},
		  { path: 'newbdd',  component: AlimbddvarComponent},
	Entity
		  { path: 'entityList', component: EntitylistComponent},
		  { path: 'entity/:entity.id', component: AlimentityComponent},
		  { path: 'newentity',  component: AlimentityComponent},
	Outildetest
		  { path: 'outildetestList', component: OutilDeTestlistComponent},
		  { path: 'outildetest/:outildetest.id', component: AlimoutildetestComponent},
		  { path: 'newoutildetest',  component: AlimoutildetestComponent},
	serveurunix
		  { path: 'serveurunixList', component: ServeurunixlistComponent},
		  { path: 'serveurunix/:serveurunix.id', component: AlimserveurunixComponent},
		  { path: 'newserveurunix',  component: AlimserveurunixComponent},


## Use
	Each configuration table store the values
	The principale table store the values et the table user can affect a chain
	


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## RESTE A FAIRE 

## Running unit tests 

Run `ng test` to execute 

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
