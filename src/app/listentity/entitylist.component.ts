
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
  templateUrl: './listentity.component.html',
  styleUrls: ['./listentity.component.css']
})


export class EntitylistComponent implements OnInit {
  dataSourceEntity: MatTableDataSource<Entity>;
  entityDisplayedColumns: string[];
  entitys: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(

    private entityService: EntityService,
    // private route: ActivatedRoute
  ) {
    this.entitys = this.entityService.getEntitys();

  }

  ngOnInit() {
    try {
      this.entityDisplayedColumns = ['id', 'entite', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceEntity = new MatTableDataSource();
      this.displayEntityGrid();
    } catch (exception) {
      console.log('Message d erreur entityList 42!!! \n' + exception);
    }
  }


  displayEntityGrid() {
    try {
      this.entityService.getEntitys().subscribe(dataList => {
        this.dataSourceEntity.data = dataList;  });
    } catch (exception) {
      console.log('Message d erreur entityList 52!!! \n' + exception);
    }
  }


  onDeleteEntity(entityid) {
    try {
      this.entityService.delete(entityid).subscribe(() => this.entitys = this.displayEntityGrid());
    } catch (exception) {
      console.log('Message d erreur entityList 62!!! \n' + exception);
    }
  }

}
