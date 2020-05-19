import { Component, OnInit, ViewChild } from '@angular/core';
import { TesttoolService } from '../service/testtool.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OutilDeTest } from '../interface/interfaceTestTool';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-outildetestlist',
  templateUrl: './listtesttool.component.html',
  styleUrls: ['./listtesttool.component.css']
})


export class OutilDeTestlistComponent implements OnInit {
  dataSourceOutilDeTest: MatTableDataSource<OutilDeTest>;
  outildetestDisplayedColumns: string[];

  isLoggedIn: boolean;
  isReader: boolean;
  isCreator: boolean;
  isAdmin: boolean;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(

    private outildetestService: TesttoolService,
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
      this.outildetestDisplayedColumns = ['id', 'outildetest', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceOutilDeTest = new MatTableDataSource();
      this.displayOutilDeTestGrid();
    } catch (exception) {
      console.log('Message d erreur outildetest 38!!! \n' + exception);
    }
  }


  displayOutilDeTestGrid() {
      this.outildetestService.getOutilDeTests().subscribe(dataList => {
        this.dataSourceOutilDeTest.data = dataList , error => console.log(error + 'erreur lors du subscribe 47');
      })
  }


  onDeleteOutilDeTest(outildetestid) {
      this.outildetestService.delete(outildetestid).subscribe(() => this.displayOutilDeTestGrid()) ,
      error => console.log(error + 'erreur lors du subscribe 54');
  }



}
