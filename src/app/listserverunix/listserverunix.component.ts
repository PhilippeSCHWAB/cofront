
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServeurUnixService } from '../service/unixserver.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ServeurUnix } from '../interface/interfaceUnixServer';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-serveurunixlist',
  templateUrl: './listserverunix.component.html',
  styleUrls: ['./listserverunix.component.css']
})


export class ServeurunixlistComponent implements OnInit {
  dataSourceServeurUnix: MatTableDataSource<ServeurUnix>;
  serveurunixDisplayedColumns: string[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(

    private serveurunixService: ServeurUnixService,
    // private route: ActivatedRoute
  ) { }

  ngOnInit() {
    try {
      this.serveurunixDisplayedColumns = ['id', 'serveurunix', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceServeurUnix = new MatTableDataSource();
      this.displayServeurUnixGrid();
    } catch (exception) {
      console.log('Message d erreur serveurunixList 38!!! \n' + exception);
    }
  }


  displayServeurUnixGrid() {
    try {
      this.serveurunixService.getServeurUnixs().subscribe(dataList => {
        this.dataSourceServeurUnix.data = dataList;
      });
    } catch (exception) {
      console.log('Message d erreur serveurunixList 50!!! \n' + exception);
    }
  }


  onDeleteServeurUnix(serveurunixid) {
    try {
      this.serveurunixService.delete(serveurunixid).subscribe(() => this.displayServeurUnixGrid());
    } catch (exception) {
      console.log('Message d erreur serveurunixList 59!!! \n' + exception);
    }
  }



}
