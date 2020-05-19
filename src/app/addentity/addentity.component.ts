
import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityService } from '../service/entity.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Entity } from '../interface/interfaceEntity';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { Location } from '@angular/common';


@Component({
  selector: 'app-alimentity',
  templateUrl: './addentity.component.html',
  styleUrls: ['./addentity.component.css']
})


export class AlimentityComponent implements OnInit {

  public entity: Entity = new Entity();
  public entityForm: FormGroup;
  public dataSourceEntity: MatTableDataSource<Entity>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  entityDisplayedColumns: string[];

  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string;
  formSubtitleLabel: string;
  paramId;


  constructor(
    private formBuilder: FormBuilder,
    private entityService: EntityService,
    private route: ActivatedRoute,
    private location: Location
  ) { }



  ngOnInit() {
    try {
      this.entityForm = new FormGroup({
        entite: new FormControl('', [Validators.required, Validators.maxLength(255)])
      });
      this.entityDisplayedColumns = ['id', 'entite', 'createdAt', 'updatedAt', 'edit', 'delete'];
      // Get  entity id
      this.route.paramMap.subscribe(
        params => {
          // Get param Id
          this.paramId = params.get('entity.id');
          if (params.get('entity.id') != null) {
            this.actionFormStatus = 'UPDATE';
            this.entityForm = new FormGroup({
              id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
              entite: new FormControl('', [Validators.required, Validators.maxLength(255)])
            });
            this.entityService.getEntitys().subscribe((entitys: Entity[]) => {
              // Get  by id
              this.entity = entitys.filter(t => t.id === parseInt(this.paramId))[0];
              this.dataSourceEntity = new MatTableDataSource();
              this.entityForm.setValue({ id: this.entity.id, entite: this.entity.entite });
              this.formTitleLabel = 'Formulaire de modification ENTITY';
              this.formSubtitleLabel = 'Modifier un Timeline' , error => console.log(error + 'erreur lors du subscribe 68');
            });
          } else {
            this.actionFormStatus = 'ADD',
              this.entityForm = new FormGroup({
                entite: new FormControl('', [Validators.required, Validators.maxLength(255)])
              });
            this.formTitleLabel = 'Formulaire d\'ajout ENTITY';
            this.formSubtitleLabel = 'Ajouter un nouveau Timeline 8h09';
            this.dataSourceEntity = new MatTableDataSource();
            this.dataSourceEntity.paginator = this.paginator;
            this.dataSourceEntity.sort = this.sort;
          }
        });
      this.entityDisplayedColumns = ['id', 'entite', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceEntity = new MatTableDataSource();
      this.displayEntityGrid();
    } catch (exception) {
      console.log('Message d erreur alimentity 87!!! \n' + exception);
    }
  }


  displayEntityGrid() {
      this.entityService.getEntitys().subscribe(dataList => {
        this.dataSourceEntity.data = dataList , error => console.log(error + 'erreur lors du subscribe 95');
      });
  }


  onSubmitEntity(entityFormValues) {
    try {
      // Set Timeline values
      this.entity.id = entityFormValues.id;
      this.entity.entite = entityFormValues.entite;
      if (this.actionFormStatus === 'ADD') {
        this.entityService.create(this.entity).subscribe(() => this.location.back()) , error => console.log(error + 'erreur lors du subscribe 105');
      }
      if (this.actionFormStatus === 'UPDATE') {
        this.entityService.update(this.entity).subscribe(() => this.location.back()) , error => console.log(error + 'erreur lors du subscribe 105');
      }
    } catch (exception) {
      console.log('Message d erreur alimentity 116!!! \n' + exception);
    }
  }


  hasError = (controlName: string, errorName: string) => {
    return this.entityForm.controls[controlName].hasError(errorName);
  }


  public onCancel = () => {
    try {
      this.location.back();
    } catch (exception) {
      console.log('Message d erreur alimentity 130!!! \n' + exception);
    }
  }

}
