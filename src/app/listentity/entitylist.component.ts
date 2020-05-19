
import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityService } from '../service/entity.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Entity } from '../interface/interfaceEntity';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';


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

  isLoggedIn: boolean;
  isReader: boolean;
  isCreator: boolean;
  isAdmin: boolean;

  constructor(

    private entityService: EntityService,
    private loginService: AuthenticationService
    // private route: ActivatedRoute
  ) {
    this.entitys = this.entityService.getEntitys();

  }

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
      this.entityDisplayedColumns = ['id', 'entite', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceEntity = new MatTableDataSource();
      this.displayEntityGrid();
    } catch (exception) {
      console.log('Message d erreur entityList 42!!! \n' + exception);
    }
  }


  displayEntityGrid() {

    this.entityService.getEntitys().subscribe(dataList => {
      this.dataSourceEntity.data = dataList, error => console.log(error + 'erreur lors du subscribe 91');
    });
  }


  onDeleteEntity(entityid) {
      this.entityService.delete(entityid).subscribe(() => this.entitys = this.displayEntityGrid()) ,
       error => console.log(error + 'erreur lors du subscribe 91');
  }

}
