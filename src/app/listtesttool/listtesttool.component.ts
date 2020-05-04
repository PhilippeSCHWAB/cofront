import { Component, OnInit, ViewChild } from '@angular/core';
import { TesttoolService } from '../service/testtool.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OutilDeTest } from '../interface/interfaceTestTool';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-outildetestlist',
  templateUrl: './listtesttool.component.html',
  styleUrls: ['./listtesttool.component.css']
})


export class OutilDeTestlistComponent implements OnInit {
  dataSourceOutilDeTest: MatTableDataSource<OutilDeTest>;
  outildetestDisplayedColumns: string[];



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(

    private outildetestService: TesttoolService,
    // private route: ActivatedRoute
  ) { }

  ngOnInit() {
    try {
      this.outildetestDisplayedColumns = ['id', 'outildetest', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceOutilDeTest = new MatTableDataSource();
      this.displayOutilDeTestGrid();
    } catch (exception) {
      console.log('Message d erreur outildetest 38!!! \n' + exception);
    }
  }


  displayOutilDeTestGrid() {
    try {
      this.outildetestService.getOutilDeTests().subscribe(dataList => {
        this.dataSourceOutilDeTest.data = dataList;
      });
    } catch (exception) {
      console.log('Message d erreur outildetest 50!!! \n' + exception);
    }
  }


  onDeleteOutilDeTest(outildetestid) {
    try {
      this.outildetestService.delete(outildetestid).subscribe(() => this.displayOutilDeTestGrid());
    } catch (exception) {
      console.log('Message d erreur outildetest 60!!! \n' + exception);
    }
  }



}
