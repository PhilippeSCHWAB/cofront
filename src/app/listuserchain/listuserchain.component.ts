import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { Observable, observable } from 'rxjs';
import { User } from '../interface/interfaceUser';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router'; // update
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
};



@Component({
  selector: 'app-userchain',
  templateUrl: './listuserchain.component.html',
  styleUrls: ['./listuserchain.component.css']
})
export class UserchainComponent implements OnInit {

  public userDisplayedColumns: string[];
  public conditionsList = CONDITIONS_LIST;
  public searchValue: any = {};
  public searchCondition: any = {};
  private filterMethods = CONDITIONS_FUNCTIONS;
  private iduser: number;
  public dataSourceUser: MatTableDataSource<User>;
  public user: User; // = new User();
  public users: Observable<User[]>; // = new User();
  public userss: User; // = new User();
  isAvailable: boolean;

  userForm;


  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string; // update
  formSubtitleLabel: string;  // update
  paramIud: string; // update
  paramId: any;


  constructor(

    private userService: UserService,

  ) {
  }

  ngOnInit() {
    try {
      if (this.userService.user === undefined) {
        //  alert('this.userService.user' + this.userService.user);
        this.isAvailable = false;
      } else {
        this.user = this.userService.user;
        this.iduser = this.user.id;
        this.isAvailable = true;

        this.userService.getFilteredUserList(this.iduser).subscribe(user => {
          const userlist = []; userlist.push(user); this.dataSourceUser.data = userlist; console.log(user);
        });
      }
      this.userDisplayedColumns = ['iud', 'nom', 'prenom', 'email', 'entite', 'tchaines'];
      this.dataSourceUser = new MatTableDataSource();
      this.displayUserGrid();
    } catch (exception) {
      console.log('Message d erreur userChain 100!!! \n' + exception);
    }
  }



  displayUserGrid() {
    try {
      this.dataSourceUser = new MatTableDataSource();
    } catch (exception) {
      console.log('Message d erreur userChain 110!!! \n' + exception);
    }
  }


  // filter
  applyFilter() {
    try {
      const searchFilter: any = {
        values: this.searchValue,
        conditions: this.searchCondition,
        methods: this.filterMethods
      };
      this.dataSourceUser.filter = searchFilter;
    } catch (exception) {
      console.log('Message d erreur userChain 124!!! \n' + exception);
    }
  }




  //  filter
  clearColumn(columnKey: string): void {
    try {
      this.searchValue[columnKey] = null;
      this.searchCondition[columnKey] = 'none';
      this.applyFilter();
    } catch (exception) {
      console.log('Message d erreur userChain 139!!! \n' + exception);
    }
  }


}
