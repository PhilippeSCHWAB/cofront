
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServeurUnixService } from '../serveurunix.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ServeurUnix } from '../interfaceServeurUnix';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-serveurunixlist',
  templateUrl: './serveurunixlist.component.html',
  styleUrls: ['./serveurunixlist.component.css']
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



    this.serveurunixDisplayedColumns = ['id', 'serveurunix', 'createdAt', 'updatedAt', 'edit', 'delete'];
    this.dataSourceServeurUnix = new MatTableDataSource();
    this.displayServeurUnixGrid();


  }


  displayServeurUnixGrid() {
    // Load serveurunix list from the associate service
    // and subscribe to the callback when loading complete
    this.serveurunixService.getServeurUnixs().subscribe(dataList => {
      this.dataSourceServeurUnix.data = dataList;
    });
  }


  onDeleteServeurUnix(id: number){
/*
    this.serveurunixService.delete(id).subscribe(() => this.displayServeurUnixGrid());
*/
  }



}
