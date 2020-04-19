
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ChainService } from '../service/chain.service';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Chain } from '../interface/interfaceChain';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../interface/interfaceUser';
import { Location, getLocaleDateTimeFormat } from '@angular/common';



export const CONDITIONS_LIST = [

  { value: 'nono', label: 'Nono' },
  { value: 'is-empty', label: 'Is empty' },
  { value: 'is-not-empty', label: 'Is not empty' },
  { value: 'is-equal', label: 'Is equal' },
  { value: 'is-not-equal', label: 'Is not equal' },
  { value: 'is-grand-than', label: 'is gran than' },
  /* { value: 'is-contained', label: 'is contained' },*/
];

export const CONDITIONS_FUNCTIONS = { // search method base on conditions list value
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
  /*
    'is-contained': function (value, filterdValue) {
      return value == indexof(filterdValue);
    },*/
};
@Component({

  selector: 'app-chainlist',
  templateUrl: './chainlist.component.html',
  styleUrls: ['./chainlist.component.css']
})

export class ChainlistComponent implements OnInit {
  dataSourceChain: MatTableDataSource<Chain>;
  chainDisplayedColumns: string[];
  public conditionsList = CONDITIONS_LIST;
  public searchValue: any = {};
  public searchCondition: any = {};
  private filterMethods = CONDITIONS_FUNCTIONS;
  //user: User;
  chainToUserCreation;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private chain: Observable<Chain[]>;
  chainList = this.chainService.getChains;
  chainForm: any;
  chains: any;
  /*
    filterForm = this.formBuilder.group({
      nomdelachaineFilterSelected: ''
    })
  */

  user = {
    id: 1,
    iud: 'b48022',
    nom: 'Schwab',
    prenom: 'Male',
    email: '',
    entite: '',
    ismanager: false,
    emailmanager: '',
    isadmin: false,
    accesauxchaines: '',
    loginunix: '',
    serveurunix: '',
    datedecreation: '',
    auteurcreation: '',
    datedemodification: '',
    auteurdemodification: '',
    refmyaccess: 0,
    // chain: any,
  }

  constructor(
    private formBuilder: FormBuilder,
    private chainService: ChainService,
    private userService: UserService,
    private location: Location
  ) {
    //this.user.iud = 'b48022';
    // this.user.nom = 'schwab';
    //    this.user.prenom = 'philippe';
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
    this.user = this.userService.user;

    this.chainDisplayedColumns = ['nomdelachaine', 'shortname', 'outildetest', 'accesauxchaines', 'datedemodification',
      'auteurdemodification', 'edit', 'ajouter', 'delete'];

    this.dataSourceChain = new MatTableDataSource();
    this.dataSourceChain.filterPredicate = (p: Chain, filtre: any) => {
      let result = true;
      let keys = Object.keys(p); // keys of the object data

      for (const key of keys) {
        let searchCondition = filtre.conditions[key]; // get search filter method

        if (searchCondition && searchCondition !== 'none') {
          if (filtre.methods[searchCondition](p[key], filtre.values[key]) === false) { // invoke search filter
            result = false // if one of the filters method not succeed the row will be remove from the filter result
            break;
          }
        }
      }
      return result;
    };

    this.dataSourceChain.paginator = this.paginator;
    this.dataSourceChain.sort = this.sort;
    this.displayChainGrid();
  }


  onNewChain() {
    console.log('NewChain!');
  }

  displayChainGrid() {
    // Load timeline list from the associate service
    // and subscribe to the callback when loading complete
    this.chainService.getChains().subscribe(dataList => {
      this.dataSourceChain.data = dataList;
    });
  }


  onFilter(filteringValues) {
    alert('filteringValues :' + filteringValues.nomdelachaineFilterSelected);
    this.chains = this.chainService.
      getFilteredChainList(filteringValues.nomdelachaineFilterSelected);
  }

  /*

    deleteChain(useriud) {
      alert(useriud);
      //  alert({ "iud": "a" });
      this.ChainService.deleteChainsTestObservable(useriud
      ).subscribe(DeletedReview => console.log(DeletedReview));
    }
  */

  onDeleteChain(chainid) {
    alert(chainid);
    console.log(chainid);
    this.chainService.delete(chainid).subscribe(() => this.chains = this.displayChainGrid());
  }
  /*
  */
  clickMethod(chainnomdelachaine: string) {
    if (confirm('Are you sure to delete ' + chainnomdelachaine)) {
      console.log(this.onDeleteChain(chainnomdelachaine));
    }
  }

  //filter
  applyFilter() {
    let searchFilter: any = {
      values: this.searchValue,
      conditions: this.searchCondition,
      methods: this.filterMethods
    };
    this.dataSourceChain.filter = searchFilter;
  }
  //filter
  clearColumn(columnKey: string): void {
    this.searchValue[columnKey] = null;
    this.searchCondition[columnKey] = 'none';
    this.applyFilter();
  }


  onEditChain(chainid) {
    alert(chainid);
  }




  onAddChainToUser(chain) {
    alert('chainid : ' + chain.id);
    alert('chainid : ' + chain.nomdelachaine);
    alert('chainid : ' + chain.shortname);
    alert('chainid : ' + chain.outildetest);

    alert('userid : ' + this.user.id);
    //this.chainidonly = chain.id;


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
      tchaines:  [{id:chain.id}]

    };

   // alert("ddddd"+ chain.id),
      this.userService.createChainToUser(this.chainToUserCreation)

        .subscribe(savedChainToUser => console.log('La ChainToUser a sauvegarder: ' + savedChainToUser));
  }


  /*

    onAddChainToUser2(chainid) {
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

      chain: this.chain




      this.userService.createUsersTestObservable(this.chainToUserCreation).subscribe(savedUser => console.log(savedUser));
      alert('L\'utilisateur est enregistré');
      this.location.back();

    }
  */

  public onCancel = () => {
    this.location.back();
  }





}





