
import { Component, OnInit, ViewChild, SystemJsNgModuleLoader } from '@angular/core';
import { AccesstochainService } from '../service/accesstochain.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Bdd } from '../interface/interfaceaccesstochain';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-bddlistparam',
  templateUrl: './listbdd.component.html',
  styleUrls: ['./listbdd.component.css']
})


export class BddlistparamComponent implements OnInit {
  dataSourceBdd: MatTableDataSource<Bdd>;
  bddDisplayedColumns: string[];
  bdds: any;

  isLoggedIn: boolean;
  isReader: boolean;
  isCreator: boolean;
  isAdmin: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private bddService: AccesstochainService,
    private loginService: AuthenticationService
    // private route: ActivatedRoute
  ) { }

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
      this.bddDisplayedColumns = ['id', 'accesauxchaines', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceBdd = new MatTableDataSource();
      this.displayBddGrid();
    } catch (exception) {
      console.log('Message d erreur bddList 38!!! \n' + exception);
    }
  }


  displayBddGrid() {
    this.bddService.getBdds().subscribe(dataList => {
      this.dataSourceBdd.data = dataList, error => console.log(error + 'erreur lors du subscribe 47');
    });
  }


  onDeleteBdd(bddid) {
    this.bddService.delete(bddid).subscribe(() => this.bdds = this.displayBddGrid()),
      error => console.log(error + 'erreur lors du subscribe 91');
  }



}
