
import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityService } from '../service/entity.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Entity } from '../interface/interfaceEntity';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-entitylist',
  templateUrl: './entitylist.component.html',
  styleUrls: ['./entitylist.component.css']
})


export class EntitylistComponent implements OnInit {
  dataSourceEntity: MatTableDataSource<Entity>;
  entityDisplayedColumns: string[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(

    private entityService: EntityService,
    // private route: ActivatedRoute
  ) { }

  ngOnInit() {



    this.entityDisplayedColumns = ['id', 'entite', 'createdAt', 'updatedAt', 'edit', 'delete'];
    this.dataSourceEntity = new MatTableDataSource();
    this.displayEntityGrid();


  }


  displayEntityGrid() {
    // Load entity list from the associate service
    // and subscribe to the callback when loading complete
    this.entityService.getEntitys().subscribe(dataList => {
      this.dataSourceEntity.data = dataList;
    });
  }


  onDeleteEntity(id: number){
/*
    this.entityService.delete(id).subscribe(() => this.displayEntityGrid());
*/
  }



}
