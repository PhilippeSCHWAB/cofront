
import { Component, OnInit, ViewChild } from '@angular/core';
import { OutilDeTestService } from '../outildetest.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OutilDeTest } from '../interfaceOutilDeTest';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-outildetestlist',
  templateUrl: './outildetest.component.html',
  styleUrls: ['./outildetest.component.css']
})


export class OutilDeTestlistComponent implements OnInit {
  dataSourceOutilDeTest: MatTableDataSource<OutilDeTest>;
  outildetestDisplayedColumns: string[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(

    private outildetestService: OutilDeTestService,
    // private route: ActivatedRoute
  ) { }

  ngOnInit() {



    this.outildetestDisplayedColumns = ['id', 'outildetest', 'createdAt', 'updatedAt', 'edit', 'delete'];
    this.dataSourceOutilDeTest = new MatTableDataSource();
    this.displayOutilDeTestGrid();


  }


  displayOutilDeTestGrid() {
    // Load outildetest list from the associate service
    // and subscribe to the callback when loading complete
    this.outildetestService.getOutilDeTests().subscribe(dataList => {
      this.dataSourceOutilDeTest.data = dataList;
    });
  }


  onDeleteOutilDeTest(id: number){
/*
    this.outildetestService.delete(id).subscribe(() => this.displayOutilDeTestGrid());
*/
  }



}
