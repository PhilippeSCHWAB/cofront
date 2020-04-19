
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ChainService } from '../service/chain.service';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Chain } from '../interface/interfaceChain';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../interface/interfaceUser';

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
};

@Component({
  selector: 'app-userchain',
  templateUrl: './userchain.component.html',
  styleUrls: ['./userchain.component.css']
})
export class UserchainComponent implements OnInit {


  dataSourceChain: MatTableDataSource<Chain>;
  chainDisplayedColumns: string[];
  public conditionsList = CONDITIONS_LIST;
  public searchValue: any = {};
  public searchCondition: any = {};
  private filterMethods = CONDITIONS_FUNCTIONS;
  //user: User;



  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //@ViewChild(MatSort, { static: true }) sort: MatSort;



  private chain: Observable<Chain[]>;
  chainList = this.chainService.getChains;
  chainForm: any;
  chains: any;


  constructor(
    private formBuilder: FormBuilder,
    private chainService: ChainService,
    private userService: UserService

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
   // this.user = this.userService.user;

    this.chainDisplayedColumns = ['nomdelachaine', 'shortname', 'outildetest', 'accesauxchaines', 'datedemodification',
      'auteurdemodification'];

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


//    this.dataSourceChain.paginator = this.paginator;
  //  this.dataSourceChain.sort = this.sort;

    this.displayChainGrid();
  }



  displayChainGrid() {
    // Load timeline list from the associate service
    // and subscribe to the callback when loading complete
    this.chainService.getChains().subscribe(dataList => {
      this.dataSourceChain.data = dataList;
    });
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

}
