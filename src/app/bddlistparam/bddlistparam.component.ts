
import { Component, OnInit, ViewChild } from '@angular/core';
import { BddService } from '../bdd.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Bdd } from '../interfaceBdd';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-bddlistparam',
  templateUrl: './bddlistparam.component.html',
  styleUrls: ['./bddlistparam.component.css']
})


export class BddlistparamComponent implements OnInit {
  dataSourceBdd: MatTableDataSource<Bdd>;
  bddDisplayedColumns: string[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    //private formBuilder: FormBuilder,
    private bddService: BddService,
    // private route: ActivatedRoute
  ) { }

  ngOnInit() {



    this.bddDisplayedColumns = ['id', 'accesauxchaines', 'createdAt', 'updatedAt', 'edit', 'delete'];
    this.dataSourceBdd = new MatTableDataSource();
    this.displayBddGrid();


  }


  displayBddGrid() {
    // Load bdd list from the associate service
    // and subscribe to the callback when loading complete
    this.bddService.getBdds().subscribe(dataList => {
      this.dataSourceBdd.data = dataList;
    });
  }


  onDeleteBdd(id: number){
/*
    this.bddService.delete(id).subscribe(() => this.displayBddGrid());
*/
  }



}
