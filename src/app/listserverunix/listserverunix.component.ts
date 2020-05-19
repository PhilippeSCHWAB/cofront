
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServeurUnixService } from '../service/unixserver.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ServeurUnix } from '../interface/interfaceUnixServer';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-serveurunixlist',
  templateUrl: './listserverunix.component.html',
  styleUrls: ['./listserverunix.component.css']
})


export class ServeurunixlistComponent implements OnInit {
  dataSourceServeurUnix: MatTableDataSource<ServeurUnix>;
  serveurunixDisplayedColumns: string[];

  isLoggedIn: boolean;
  isReader: boolean;
  isCreator: boolean;
  isAdmin: boolean;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(

    private serveurunixService: ServeurUnixService,
    private loginService: AuthenticationService
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
      this.serveurunixDisplayedColumns = ['id', 'serveurunix', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceServeurUnix = new MatTableDataSource();
      this.displayServeurUnixGrid();
    } catch (exception) {
      console.log('Message d erreur serveurunixList 38!!! \n' + exception);
    }
  }


  displayServeurUnixGrid() {
    this.serveurunixService.getServeurUnixs().subscribe(dataList => {
      this.dataSourceServeurUnix.data = dataList, error => console.log(error + 'erreur lors du subscribe 46');
    });
  }


  onDeleteServeurUnix(serveurunixid) {
    this.serveurunixService.delete(serveurunixid).subscribe(() => this.displayServeurUnixGrid()),
      error => console.log(error + 'erreur lors du subscribe 53');

  }

}
