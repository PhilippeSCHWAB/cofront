
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { TchainesService } from '../service/tchaines.service';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { TChaines } from '../interface/interfaceTChain';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../interface/interfaceUser';
import { Location, getLocaleDateTimeFormat } from '@angular/common';
import { AuthenticationService } from '../service/authentication.service';


export const CONDITIONS_LIST = [
  { value: 'is-content', label: 'Is Content' },
  { value: 'is-no-content', label: 'Is no Content' },
  { value: 'is-empty', label: 'Is empty' },
  { value: 'is-not-empty', label: 'Is not empty' },
  { value: 'is-equal', label: 'Is equal' },
  { value: 'is-not-equal', label: 'Is not equal' },
  { value: 'is-grand-than', label: 'is gran than' },
  /* { value: 'is-contained', label: 'is contained' },*/
];

export const CONDITIONS_FUNCTIONS = { // search method base on conditions list value
  'is-content': function (value, filterdValue) {
    const index = value.indexOf(filterdValue);
    if (index < 0) {
      return false;
    }
  },

  'is-no-content': function (value, filterdValue) {
    const index = value.indexOf(filterdValue);
    if (index > 0) {
      return false;
    }
  },
  'is-empty': function (value, filterdValue) {
    return value === '';
  },
  'is-not-empty': function (value, filterdValue) {
    return value !== '';
  },
  'is-equal': function (value, filterdValue) {
    return value == filterdValue;
  },
  'is-not-equal': function (value, filterdValue) {
    return value != filterdValue;
  },
  'is-grand-than': function (value, filterdValue) {
    return value >= filterdValue;
  },
};

@Component({
  selector: 'app-chainlist',
  templateUrl: './listchain.component.html',
  styleUrls: ['./listchain.component.css']
})

export class ChainlistComponent implements OnInit {
  dataSourceChain: MatTableDataSource<TChaines>;
  chainDisplayedColumns: string[];
  public conditionsList = CONDITIONS_LIST;
  public searchValue: any = {};
  public searchCondition: any = {};
  private filterMethods = CONDITIONS_FUNCTIONS;
  user: User;
  chainToUserCreation;
  isAvailable: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private chain: Observable<TChaines[]>;
  chainList = this.chainService.getChains;
  chainForm: any;
  chains: any;

  isLoggedIn: boolean;
  isReader: boolean;
  isCreator: boolean;
  isAdmin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private chainService: TchainesService,
    private userService: UserService,
    private location: Location,
    private loginService: AuthenticationService
  ) {

    this.chains = this.chainService.getChains();
    this.chainForm = this.formBuilder.group({
      nomdelachaine: '',
      shortname: '',
      accesauxchaines: '',
      outildetest: '',
      datedemodification: '',
      auteurdemodification: ''
    });
  }


  ngOnInit() {
    this.loginService.userAdminRoles.subscribe(userRoles => {
      this.isLoggedIn = false, error => console.log(error + 'erreur lors du subscribe 43');

      this.isReader = userRoles.includes('ROLE_READER');
      this.isCreator = userRoles.includes('ROLE_CREATOR');
      this.isAdmin = userRoles.includes('ROLE_ADMIN');

      if (userRoles && userRoles.length > 0) {
        this.isLoggedIn = true;
      }
    });
    try {
      if (this.userService.user === undefined) {
        this.isAvailable = false;
      } else {
        this.user = this.userService.user;
        //  alert('00ddd : '+ this.user.chain.id);
        this.isAvailable = true;
      }
      this.chainDisplayedColumns = ['nomdelachaine', 'shortname', 'outildetest', 'accesauxchaines', 'datedemodification',
        'auteurdemodification', 'edit', 'ajouter', 'delete'];

      this.dataSourceChain = new MatTableDataSource();

      this.dataSourceChain.filterPredicate = (p: TChaines, filtre: any) => {
        let result = true;
        const keys = Object.keys(p); // keys of the object data

        for (const key of keys) {
          let searchCondition = filtre.conditions[key]; // get search filter method

          if (searchCondition && searchCondition !== 'none') {
            if (filtre.methods[searchCondition](p[key], filtre.values[key]) === false) { // invoke search filter
              result = false; // if one of the filters method not succeed the row will be remove from the filter result
              break;
            }
          }
        }
        return result;
      };
      this.dataSourceChain.paginator = this.paginator;
      this.dataSourceChain.sort = this.sort;
      this.displayChainGrid();
    } catch (exception) {
      console.log('Message d erreur chainListList 133!!! \n' + exception);
    }
  }


  onEditChain(chainid) {
    //  alert(userid);
  }



  displayChainGrid() {

    this.chainService.getChains().subscribe(dataList => {
      this.dataSourceChain.data = dataList, error => console.log(error + 'erreur lors du subscribe 148');
    });

  }


  onFilter(filteringValues) {
    try {
      this.chains = this.chainService.
        getFilteredChainList(filteringValues.nomdelachaineFilterSelected);
    } catch (exception) {
      console.log('Message d erreur entityList 156!!! \n' + exception);
    }
  }


  onDeleteChain(chainid) {

    this.chainService.delete(chainid).subscribe(() => this.chains = this.displayChainGrid()), error => console.log(error + 'erreur lors du subscribe 91');

  }


  clickMethod(chainnomdelachaine: string) {
    try {
      if (confirm('Are you sure to delete ' + chainnomdelachaine)) {
        console.log(this.onDeleteChain(chainnomdelachaine));
      }
    } catch (exception) {
      console.log('Message d erreur entityList 176!!! \n' + exception);
    }
  }


  //filter
  applyFilter() {
    try {
      let searchFilter: any = {
        values: this.searchValue,
        conditions: this.searchCondition,
        methods: this.filterMethods
      };
      this.dataSourceChain.filter = searchFilter;
    } catch (exception) {
      console.log('Message d erreur entityList 190!!! \n' + exception);
    }
  }




  // filter
  clearColumn(columnKey: string): void {
    try {
      this.searchValue[columnKey] = null;
      this.searchCondition[columnKey] = 'none';
      this.applyFilter();
    } catch (exception) {
      console.log('Message d erreur entityList 161!!! \n' + exception);
    }
  }



  onAddChainToUser(chain) {
    alert('this.user.chain ' + this.user.tchaines);


    try {
      // this.user.chain=.push();

      this.chainToUserCreation = {
        id: this.user.id,
        iud: this.user.iud,
        nom: this.user.nom,
        prenom: this.user.prenom,
        email: this.user.email,
        entite: this.user.entite,
        ismanager: this.user.ismanager,
        emailmanager: this.user.emailmanager,
        isadmin: this.user.isadmin,
        accesauxchaines: this.user.accesauxchaines,
        loginunix: this.user.loginunix,
        serveurunix: this.user.serveurunix,
        datedecreation: this.user.datedecreation,
        auteurcreation: this.user.auteurcreation,
        datedemodification: this.user.datedecreation,
        auteurdemodification: this.user.auteurcreation,
        refmyaccess: this.user.refmyaccess,
        // tchaines: [{ id: chain.id }]
        tchaines: this.user.tchaines
      };

      //   alert('this.user.chain.id : ' + this.user.chain);
      this.chainToUserCreation.tchaines.push({ id: chain.id });

      this.userService.createChainToUser(this.chainToUserCreation)
        .subscribe(savedChainToUser => console.log('La ChainToUser a sauvegarder: ' + savedChainToUser)),
         error => console.log(error + 'erreur lors du subscribe 245');
    } catch (exception) {
      console.log('Message d erreur entityList 236!!! \n' + exception);
    }
  }


  public onCancel = () => {
    try {
      this.location.back();
    } catch (exception) {
      console.log('Message d erreur entityList 247!!! \n' + exception);
    }
  }




}

