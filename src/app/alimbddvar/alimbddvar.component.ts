
import { Component, OnInit, ViewChild } from '@angular/core';
import { BddService } from '../bdd.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Bdd } from '../interfaceBdd';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { Location } from '@angular/common';


@Component({
  selector: 'app-alimbddvar',
  templateUrl: './alimbddvar.component.html',
  styleUrls: ['./alimbddvar.component.css']
})


export class AlimbddvarComponent implements OnInit {

  public bdd: Bdd = new Bdd();
  public bddForm: FormGroup;

  //dataSourceBdd: MatTableDataSource<Bdd>;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  public dataSourceBdd: MatTableDataSource<Bdd>;
  //bddsDisplayedColumns = [];

  bddDisplayedColumns: string[];

  //bddsList;
  //bddsListSelect;
  //selectBddForm;


  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string;
  formSubtitleLabel: string;
  paramId;


  /*

    private bdd: Observable<Bdd[]>;
    bddList = this.bddService.bdds;
    bddForm: any;
    bdds: any;

  */
  constructor(
    private formBuilder: FormBuilder,
    private bddService: BddService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    /*
    this.bdds = this.bddService.getBddsObservable();
    this.bddForm = this.formBuilder.group({
      id: '1',
      accesauxchaines: '',
      createdAt: '',
      updatedAt: '',

    });*/

  }


  ngOnInit() {


    this.bddForm = new FormGroup({
    //  id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      accesauxchaines: new FormControl('', [Validators.required, Validators.maxLength(255)])
    });
    this.bddDisplayedColumns = ['id', 'accesauxchaines', 'createdAt', 'updatedAt', 'edit', 'delete'];

    // Get recieved bdd id
    this.route.paramMap.subscribe(
      params => {
        // Get param Id
        this.paramId = params.get('bdd.id');
        //  alert(this.paramId);
        if (params.get('bdd.id') != null) {
        //  alert('UPDATE');
          this.actionFormStatus = 'UPDATE';


          this.bddForm = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
            accesauxchaines: new FormControl('', [Validators.required, Validators.maxLength(255)])
          });

          this.bddService.getBdds().subscribe((bdds: Bdd[]) => {
            // Get Timeline by id
            this.bdd = bdds.filter(t => t.id === parseInt(this.paramId))[0];
            this.dataSourceBdd = new MatTableDataSource();
         //   alert(this.bdd.id + ' / ' + this.bdd.accesauxchaines + ' / ' + this.bdd.createdAt);
            this.bddForm.setValue({ id: this.bdd.id, accesauxchaines: this.bdd.accesauxchaines });
            this.formTitleLabel = 'Formulaire de modification 8:11';
            this.formSubtitleLabel = 'Modifier un Timeline';
          });
        }
        else {
        //  alert('ADD');
          this.actionFormStatus = 'ADD',

          this.bddForm = new FormGroup({
          // id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
            accesauxchaines: new FormControl('', [Validators.required, Validators.maxLength(255)])
          });

          this.formTitleLabel = 'Formulaire d\'ajout 8h10';
          this.formSubtitleLabel = 'Ajouter un nouveau Timeline 8h09';
          this.dataSourceBdd = new MatTableDataSource();
          this.dataSourceBdd.paginator = this.paginator;
          this.dataSourceBdd.sort = this.sort;
        }
      });

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



  onSubmitBdd(bddFormValues) {
    // Set Timeline values
    this.bdd.id = bddFormValues.id;
    this.bdd.accesauxchaines = bddFormValues.accesauxchaines;

   // alert(bddFormValues.accesauxchaines);
    // Set current date
   // const d = new Date();
  //  let dsNow = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + ' ' +
     // ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':00';
    /*
        if (this.actionFormStatus == 'ADD') {
          this.bdd.creationDate = dsNow;
        }

        this.bdd.updateDate = dsNow;
    */

    if (this.actionFormStatus == 'ADD') {
      this.bddService.create(this.bdd).subscribe(() => this.location.back());
    }
    if (this.actionFormStatus == 'UPDATE') {
      this.bddService.update(this.bdd).subscribe(() => this.location.back());
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.bddForm.controls[controlName].hasError(errorName);
  }


 public onCancel = () => {
    this.location.back();
  }

}
