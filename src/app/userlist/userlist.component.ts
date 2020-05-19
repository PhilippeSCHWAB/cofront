import { Component, OnInit, Output, ViewChild, SystemJsNgModuleLoader } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../interface/interfaceUser';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router'; // update
import { AuthenticationService } from '../service/authentication.service';

export const CONDITIONS_LIST = [
  { value: 'is-content', label: 'Is Content' },
  { value: 'is-no-content', label: 'Is no Content' },
  { value: 'is-empty', label: 'Is empty' },
  { value: 'is-not-empty', label: 'Is not empty' },
  { value: 'is-equal', label: 'Is equal' },
  { value: 'is-not-equal', label: 'Is not equal' },
  { value: 'is-grand-than', label: 'is gran than' },
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
  value: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private user: Observable<User[]>;
  userList = this.userService.getUsers;
  userForm;
  users: any;

  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string; // update
  formSubtitleLabel: string;  // update
  paramIud: string; // update

  isLoggedIn: boolean;
  isReader: boolean;
  isCreator: boolean;
  isAdmin: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private loginService: AuthenticationService
  ) {
    this.users = this.userService.getUsers();
    this.userForm = this.formBuilder.group({
      id: '',
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
      refmyaccess: '',
      tchaines: '',
    });
  }

  ngOnInit() {
    this.loginService.userAdminRoles.subscribe(userRoles => {
      this.isLoggedIn = false, error => console.log(error + 'erreur lors du subscribe 43');

      this.isReader = userRoles.includes('ROLE_READER');
      //console.log(  this.isReader )
      this.isCreator = userRoles.includes('ROLE_CREATOR');
      //    console.log( this.isCreator )
      this.isAdmin = userRoles.includes('ROLE_ADMIN');
      //  console.log(  this.isAdmin  )


      if (userRoles && userRoles.length > 0) {
        this.isLoggedIn = true;
      }
    });
    try {
      this.userDisplayedColumns = ['iud', 'nom', 'prenom', 'email', 'entite', 'ismanager', 'emailmanager',
        'isadmin', 'accesauxchaines', 'serveurunix', 'loginunix', /*'datedecreation', 'auteurcreation',
      'datedemodification', 'auteurdemodification', */'refmyaccess', 'tchaines', 'edit', 'addchainforuser', 'delete'];

      this.dataSourceUser = new MatTableDataSource();

      this.dataSourceUser.filterPredicate = (p: User, filtre: any) => {
        let result = true;
        const keys = Object.keys(p); // keys of the object data

        for (const key of keys) {
          const searchCondition = filtre.conditions[key]; // get search filter method

          if (searchCondition && searchCondition !== 'none') {
            if (filtre.methods[searchCondition](p[key], filtre.values[key]) === false) { // invoke search filter
              result = false; // if one of the filters method not succeed the row will be remove from the filter result
              break;
            }
          }
        }
        return result;
      };

      this.dataSourceUser.paginator = this.paginator;
      this.dataSourceUser.sort = this.sort;
      this.displayUserGrid();


    } catch (exception) {
      console.log('Message d erreur userList 144!!! \n' + exception);
    }

  }


  displayUserGrid() {

      // Load timeline list from the associate service
      // and subscribe to the callback when loading complete
      this.userService.getUsers().subscribe(dataList => {
        this.dataSourceUser.data = dataList , error => console.log(error + 'erreur lors du subscribe 150');
      });
      //  alert(this.dataSourceUser.data.values);

  }



  onDeleteUser(userid) {

      this.userService.delete(userid).subscribe(() => this.users = this.displayUserGrid()) , error => console.log(error + 'erreur lors du subscribe 160');

  }


  onEditUser(userid) {
    //  alert(userid);
  }



  AddChainForUser(user: User) {
    try {
      this.userService.user = user;
    } catch (exception) {
      console.log('Message d erreur UserList 179!!! \n' + exception);
    }
  }


  clickMethod(userid: string) {
    try {
      if (confirm('Are you sure to delete :' + userid)) {
      }
    } catch (exception) {
      console.log('Message d erreur UserList 204!!! \n' + exception);
    }
  }


  displayTimelinUserListGrid() {
      this.userService.getUsers().subscribe(dataList => {
        this.dataSourceUser.data = dataList , error => console.log(error + 'erreur lors du subscribe 192');
      });
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
      console.log('Message d erreur UserList 233!!! \n' + exception);
    }
  }

  // filter
  clearColumn(columnKey: string): void {
    try {
      this.searchValue[columnKey] = null;
      this.searchCondition[columnKey] = 'none';
      this.applyFilter();
    } catch (exception) {
      console.log('Message d erreur UserList 243!!! \n' + exception);
    }

  }


}
