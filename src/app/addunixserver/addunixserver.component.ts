
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServeurUnixService } from '../service/unixserver.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ServeurUnix } from '../interface/interfaceUnixServer';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { Location } from '@angular/common';


@Component({
  selector: 'app-alimserveurunix',
  templateUrl: './addunixserver.component.html',
  styleUrls: ['./addunixserver.component.css']
})


export class AlimserveurunixComponent implements OnInit {

  public serveurunix: ServeurUnix = new ServeurUnix();
  public serveurunixForm: FormGroup;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  public dataSourceServeurUnix: MatTableDataSource<ServeurUnix>;


  serveurunixDisplayedColumns: string[];


  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string;
  formSubtitleLabel: string;
  paramId;


  constructor(
    private formBuilder: FormBuilder,
    private serveurunixService: ServeurUnixService,
    private route: ActivatedRoute,
    private location: Location
  ) {


  }


  ngOnInit() {
    try {




      this.serveurunixForm = new FormGroup({
        //  id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        serveurunix: new FormControl('', [Validators.required, Validators.maxLength(255)])
      });
      this.serveurunixDisplayedColumns = ['id', 'serveurunix', 'createdAt', 'updatedAt', 'edit', 'delete'];

      // Get recieved serveurunix id
      this.route.paramMap.subscribe(
        params => {
          // Get param Id
          this.paramId = params.get('serveurunix.id');
          //  alert(this.paramId);
          if (params.get('serveurunix.id') != null) {
            //  alert('UPDATE');
            this.actionFormStatus = 'UPDATE';


            this.serveurunixForm = new FormGroup({
              id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
              serveurunix: new FormControl('', [Validators.required, Validators.maxLength(255)])
            });

            this.serveurunixService.getServeurUnixs().subscribe((serveurunixs: ServeurUnix[]) => {
              // Get Timeline by id
              this.serveurunix = serveurunixs.filter(t => t.id === parseInt(this.paramId))[0];
              this.dataSourceServeurUnix = new MatTableDataSource();
              //   alert(this.serveurunix.id + ' / ' + this.serveurunix.serveurunix + ' / ' + this.serveurunix.createdAt);
              this.serveurunixForm.setValue({ id: this.serveurunix.id, serveurunix: this.serveurunix.serveurunix });
              this.formTitleLabel = 'Formulaire de modification SERVEUR UNIX';
              this.formSubtitleLabel = 'Modifier un Timeline';
            });
          } else {
            //  alert('ADD');
            this.actionFormStatus = 'ADD',

              this.serveurunixForm = new FormGroup({
                // id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
                serveurunix: new FormControl('', [Validators.required, Validators.maxLength(255)])
              });

            this.formTitleLabel = 'Formulaire d\'ajout SERVEUR UNIX';
            this.formSubtitleLabel = 'Ajouter un nouveau Timeline 8h09';
            this.dataSourceServeurUnix = new MatTableDataSource();
            this.dataSourceServeurUnix.paginator = this.paginator;
            this.dataSourceServeurUnix.sort = this.sort;
          }
        });

      this.serveurunixDisplayedColumns = ['id', 'serveurunix', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceServeurUnix = new MatTableDataSource();

      this.displayServeurUnixGrid();
    } catch (exception) {
      console.log('Message d erreur alimserveurunix 112!!! \n' + exception);
    }

  }


  displayServeurUnixGrid() {
    try {
      this.serveurunixService.getServeurUnixs().subscribe(dataList => {
        this.dataSourceServeurUnix.data = dataList;
      });
    } catch (exception) {
      console.log('Message d erreur alimserveurunix 124!!! \n' + exception);
    }
  }



  onSubmitServeurUnix(serveurunixFormValues) {

    // Set Timeline values
    this.serveurunix.id = serveurunixFormValues.id;
    this.serveurunix.serveurunix = serveurunixFormValues.serveurunix;
    try {
      if (this.actionFormStatus == 'ADD') {
        this.serveurunixService.create(this.serveurunix).subscribe(() => this.location.back());
      }
    } catch (exception) {
      console.log('Message d erreur alimserveurunix 145!!! \n' + exception);
    }
    this.serveurunix.serveurunix = serveurunixFormValues.serveurunix;
    try {
      if (this.actionFormStatus == 'UPDATE') {
        this.serveurunixService.update(this.serveurunix).subscribe(() => this.location.back());
      }
    } catch (exception) {
      console.log('Message d erreur alimserveurunix 145!!! \n' + exception);
    }
    }

  hasError = (controlName: string, errorName: string) => {
    return this.serveurunixForm.controls[controlName].hasError(errorName);
  }


  public onCancel = () => {
    try {
      this.location.back();
    } catch (exception) {
      console.log('Message d erreur alimserveurunix 124!!! \n' + exception);
    }
  }

}
