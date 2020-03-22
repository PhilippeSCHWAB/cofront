
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ChainService } from '../chain.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Chain } from '../interfaceChain';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';




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


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private chain: Observable<Chain[]>;
  chainList = this.chainService.chains;
  chainForm: any;
  chains: any;
  /*
    filterForm = this.formBuilder.group({
      nomdelachaineFilterSelected: ''
    })
  */

  constructor(
    private formBuilder: FormBuilder,
    private chainService: ChainService
  ) {
    this.chains = this.chainService.getChainsTestObservable();
    this.chainForm = this.formBuilder.group({

      nomdelachaine: '',
      shortname: '',
      outildetest: '',
      accessauxchaines: '',
      datedemodification: '',
      auteurdemodification: '',
    });
  }

  ngOnInit() {

    this.chainDisplayedColumns = ['nomdelachaine', 'shortname', 'outildetest', 'accessauxchaines', 'datedemodification',
      'auteurdemodification', 'delete'];

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
      return result
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
    this.chainService.getChainsTestObservable().subscribe(dataList => {
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


  onDeleteChain(chainnomdelachaine) {
    alert(chainnomdelachaine);
    console.log(chainnomdelachaine);
    this.chainService.deleteChainsTestObservable(chainnomdelachaine).subscribe(() => this.chains = this.displayChainGrid());

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

}

