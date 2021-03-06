
import { Component, OnInit, ViewChild } from '@angular/core';
import { OutilDeTestService } from '../service/outildetest.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OutilDeTest } from '../interface/interfaceOutilDeTest';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { Location } from '@angular/common';


@Component({
  selector: 'app-alimoutildetest',
  templateUrl: './alimoutildetest.component.html',
  styleUrls: ['./alimoutildetest.component.css']
})


export class AlimoutildetestComponent implements OnInit {

  public outildetest: OutilDeTest = new OutilDeTest();
  public outildetestForm: FormGroup;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  public dataSourceOutilDeTest: MatTableDataSource<OutilDeTest>;


  outildetestDisplayedColumns: string[];


  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string;
  formSubtitleLabel: string;
  paramId;


  /*

    private outildetest: Observable<OutilDeTest[]>;
    outildetestList = this.outildetestService.outildetests;
    outildetestForm: any;
    outildetests: any;

  */
  constructor(
    private formBuilder: FormBuilder,
    private outildetestService: OutilDeTestService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    /*
    this.outildetests = this.outildetestService.getOutilDeTestsObservable();
    this.outildetestForm = this.formBuilder.group({
      id: '1',
      outildetest: '',
      createdAt: '',
      updatedAt: '',

    });*/

  }


  ngOnInit() {


    this.outildetestForm = new FormGroup({
    //  id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      outildetest: new FormControl('', [Validators.required, Validators.maxLength(255)])
    });
    this.outildetestDisplayedColumns = ['id', 'outildetest', 'createdAt', 'updatedAt', 'edit', 'delete'];

    // Get recieved outildetest id
    this.route.paramMap.subscribe(
      params => {
        // Get param Id
        this.paramId = params.get('outildetest.id');
        //  alert(this.paramId);
        if (params.get('outildetest.id') != null) {
        //  alert('UPDATE');
          this.actionFormStatus = 'UPDATE';


          this.outildetestForm = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
            outildetest: new FormControl('', [Validators.required, Validators.maxLength(255)])
          });

          this.outildetestService.getOutilDeTests().subscribe((outildetests: OutilDeTest[]) => {
            // Get Timeline by id
            this.outildetest = outildetests.filter(t => t.id === parseInt(this.paramId))[0];
            this.dataSourceOutilDeTest = new MatTableDataSource();
         //   alert(this.outildetest.id + ' / ' + this.outildetest.outildetest + ' / ' + this.outildetest.createdAt);
            this.outildetestForm.setValue({ id: this.outildetest.id, outildetest: this.outildetest.outildetest });
            this.formTitleLabel = 'Formulaire de modification 8:11';
            this.formSubtitleLabel = 'Modifier un Timeline';
          });
        }
        else {
        //  alert('ADD');
          this.actionFormStatus = 'ADD',

          this.outildetestForm = new FormGroup({
          // id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
            outildetest: new FormControl('', [Validators.required, Validators.maxLength(255)])
          });

          this.formTitleLabel = 'Formulaire d\'ajout 8h10';
          this.formSubtitleLabel = 'Ajouter un nouveau Timeline 8h09';
          this.dataSourceOutilDeTest = new MatTableDataSource();
          this.dataSourceOutilDeTest.paginator = this.paginator;
          this.dataSourceOutilDeTest.sort = this.sort;
        }
      });

    this.outildetestDisplayedColumns = ['id', 'outildetest', 'createdAt', 'updatedAt', 'edit', 'delete'];
    this.dataSourceOutilDeTest = new MatTableDataSource();

    this.displayOutilDeTestGrid();
  }


  displayOutilDeTestGrid() {
    // Load outildetest list from the associate service
    // and subscribe to the callback when loading complete
    this.outildetestService.getOutilDeTests().subscribe(dataList => {
      this.dataSourceOutilDeTest.data = dataList;
    });
  }



  onSubmitOutilDeTest(outildetestFormValues) {
    // Set Timeline values
    this.outildetest.id = outildetestFormValues.id;
    this.outildetest.outildetest = outildetestFormValues.outildetest;


    if (this.actionFormStatus == 'ADD') {
      this.outildetestService.create(this.outildetest).subscribe(() => this.location.back());
    }
    if (this.actionFormStatus == 'UPDATE') {
      this.outildetestService.update(this.outildetest).subscribe(() => this.location.back());
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.outildetestForm.controls[controlName].hasError(errorName);
  }


 public onCancel = () => {
    this.location.back();
  }

}
