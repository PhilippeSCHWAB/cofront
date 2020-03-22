import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../interfaceUser';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';//update
/*
import { deleteTimelinesTestObservable() } from '../games.service';
*/

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
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {
  dataSourceUser: MatTableDataSource<User>;
  userDisplayedColumns: string[];
  public conditionsList = CONDITIONS_LIST;
  public searchValue: any = {};
  public searchCondition: any = {};
  private filterMethods = CONDITIONS_FUNCTIONS;



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private user: Observable<User[]>;
  userList = this.userService.users;
  userForm;
  users: any;

  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string; // update
  formSubtitleLabel: string;  // update
  paramIud: string; // update


  /*
  filterForm = this.formBuilder.group({
    iudFilterSelected: ''
  })

*/
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.users = this.userService.getUsersTestObservable();
    this.userForm = this.formBuilder.group({

      iud: '',
      nom: '',
      prenom: '',
      email: '',
      entite: '',
      ismanager: '',
      emailmanager: '',
      isadmin: '',
      accesauxchaines: '',
      serveurunix: '',
      loginunix: '',
      datedecreation: '',
      auteurcreation: '',
      datedemodification: '',
      auteurdemodification: '',
      refmyaccess: '',
    });
  }

  ngOnInit() {

    this.userDisplayedColumns = ['iud', 'nom', 'prenom', 'email', 'entite', 'ismanager', 'emailmanager',
      'isadmin', 'accesauxchaines', 'serveurunix', 'loginunix', 'datedecreation', 'auteurcreation',
      'datedemodification', 'auteurdemodification', 'refmyaccess', 'edit', 'delete'];

    this.dataSourceUser = new MatTableDataSource();

    this.dataSourceUser.filterPredicate = (p: User, filtre: any) => {
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

    this.dataSourceUser.paginator = this.paginator;
    this.dataSourceUser.sort = this.sort;
    this.displayUserGrid();



  }


  onEditUser(useriud) {
alert(useriud);
  }




  onNewUser() {
    console.log('NewUser!');
  }


  displayUserGrid() {
    // Load timeline list from the associate service
    // and subscribe to the callback when loading complete
    this.userService.getUsersTestObservable().subscribe(dataList => {
      this.dataSourceUser.data = dataList;
    });
  }
  /*
    onFilter(filteringValues) {
      alert('filteringValues :' + filteringValues.iudFilterSelected);
      this.users = this.userService.
        getFilteredUserList(filteringValues.iudFilterSelected);
    }
  */

  deleteUser(useriud) {
    // alert(useriud);OTO

    this.userService.deleteUsersTestObservable(useriud
    ).subscribe(DeletedReview => console.log(DeletedReview));

  }

  onDeleteUser(useriud) {
    alert(useriud);
    console.log(useriud);
    this.userService.deleteUsersTestObservable(useriud).subscribe(() => this.users = this.displayUserGrid());
    //alert('avant rzfresy ' +useriud);
  }

  clickMethod(useriud: string) {
    if (confirm('Are you sure to delete :' + useriud)) {
      console.log(this.onDeleteUser(useriud));
    }
  }


  displayTimelinUserListGrid() {
    // Load timeline list from the associate service
    // and subscribe to the callback when loading complete
    this.userService.getUsersTestObservable().subscribe(dataList => {
      this.dataSourceUser.data = dataList;
    });
  }

  //filter
  applyFilter() {
    let searchFilter: any = {
      values: this.searchValue,
      conditions: this.searchCondition,
      methods: this.filterMethods
    };
    this.dataSourceUser.filter = searchFilter;
  }
  //filter
  clearColumn(columnKey: string): void {
    this.searchValue[columnKey] = null;
    this.searchCondition[columnKey] = 'none';
    this.applyFilter();
  }


}
