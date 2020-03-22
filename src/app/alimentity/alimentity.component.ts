
import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityService } from '../entity.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Entity } from '../interfaceEntity';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { Location } from '@angular/common';


@Component({
  selector: 'app-alimentity',
  templateUrl: './alimentity.component.html',
  styleUrls: ['./alimentity.component.css']
})


export class AlimentityComponent implements OnInit {

  public entity: Entity = new Entity();
  public entityForm: FormGroup;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  public dataSourceEntity: MatTableDataSource<Entity>;


  entityDisplayedColumns: string[];


  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string;
  formSubtitleLabel: string;
  paramId;


  /*

    private entity: Observable<Entity[]>;
    entityList = this.entityService.entitys;
    entityForm: any;
    entitys: any;

  */
  constructor(
    private formBuilder: FormBuilder,
    private entityService: EntityService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    /*
    this.entitys = this.entityService.getEntitysObservable();
    this.entityForm = this.formBuilder.group({
      id: '1',
      entite: '',
      createdAt: '',
      updatedAt: '',

    });*/

  }


  ngOnInit() {


    this.entityForm = new FormGroup({
    //  id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      entite: new FormControl('', [Validators.required, Validators.maxLength(255)])
    });
    this.entityDisplayedColumns = ['id', 'entite', 'createdAt', 'updatedAt', 'edit', 'delete'];

    // Get recieved entity id
    this.route.paramMap.subscribe(
      params => {
        // Get param Id
        this.paramId = params.get('entity.id');
        //  alert(this.paramId);
        if (params.get('entity.id') != null) {
        //  alert('UPDATE');
          this.actionFormStatus = 'UPDATE';


          this.entityForm = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
            entite: new FormControl('', [Validators.required, Validators.maxLength(255)])
          });

          this.entityService.getEntitys().subscribe((entitys: Entity[]) => {
            // Get Timeline by id
            this.entity = entitys.filter(t => t.id === parseInt(this.paramId))[0];
            this.dataSourceEntity = new MatTableDataSource();
         //   alert(this.entity.id + ' / ' + this.entity.entite + ' / ' + this.entity.createdAt);
            this.entityForm.setValue({ id: this.entity.id, entite: this.entity.entite });
            this.formTitleLabel = 'Formulaire de modification 8:11';
            this.formSubtitleLabel = 'Modifier un Timeline';
          });
        }
        else {
        //  alert('ADD');
          this.actionFormStatus = 'ADD',

          this.entityForm = new FormGroup({
          // id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
            entite: new FormControl('', [Validators.required, Validators.maxLength(255)])
          });

          this.formTitleLabel = 'Formulaire d\'ajout 8h10';
          this.formSubtitleLabel = 'Ajouter un nouveau Timeline 8h09';
          this.dataSourceEntity = new MatTableDataSource();
          this.dataSourceEntity.paginator = this.paginator;
          this.dataSourceEntity.sort = this.sort;
        }
      });

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



  onSubmitEntity(entityFormValues) {
    // Set Timeline values
    this.entity.id = entityFormValues.id;
    this.entity.entite = entityFormValues.entite;


    if (this.actionFormStatus == 'ADD') {
      this.entityService.create(this.entity).subscribe(() => this.location.back());
    }
    if (this.actionFormStatus == 'UPDATE') {
      this.entityService.update(this.entity).subscribe(() => this.location.back());
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.entityForm.controls[controlName].hasError(errorName);
  }


 public onCancel = () => {
    this.location.back();
  }

}
