
import { Component, OnInit, ViewChild } from '@angular/core';
import { TesttoolService } from '../service/testtool.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OutilDeTest } from '../interface/interfaceTestTool';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { Location } from '@angular/common';


@Component({
  selector: 'app-alimoutildetest',
  templateUrl: './addtesttool.component.html',
  styleUrls: ['./addtesttool.component.css']
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


  constructor(
    private formBuilder: FormBuilder,
    private outildetestService: TesttoolService,
    private route: ActivatedRoute,
    private location: Location
  ) {


  }


  ngOnInit() {
    try {
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

          if (params.get('outildetest.id') != null) {

            this.actionFormStatus = 'UPDATE';


            this.outildetestForm = new FormGroup({
              id: new FormControl('', [Validators.required, Validators.maxLength(255)]),
              outildetest: new FormControl('', [Validators.required, Validators.maxLength(255)])
            });

            this.outildetestService.getOutilDeTests().subscribe((outildetests: OutilDeTest[]) => {
              // Get  by id
              this.outildetest = outildetests.filter(t => t.id === parseInt(this.paramId))[0];
              this.dataSourceOutilDeTest = new MatTableDataSource();

              this.outildetestForm.setValue({ id: this.outildetest.id, outildetest: this.outildetest.outildetest });
              this.formTitleLabel = 'Formulaire de modification OUTIL DE TEST';
              this.formSubtitleLabel = 'Modifier un Timeline';
            });
          } else {
            this.actionFormStatus = 'ADD',
              this.outildetestForm = new FormGroup({
                outildetest: new FormControl('', [Validators.required, Validators.maxLength(255)])
              });

            this.formTitleLabel = 'Formulaire d\'ajout OUTIL DE TEST';
            this.formSubtitleLabel = 'Ajouter un nouveau Timeline 8h09';
            this.dataSourceOutilDeTest = new MatTableDataSource();
            this.dataSourceOutilDeTest.paginator = this.paginator;
            this.dataSourceOutilDeTest.sort = this.sort;
          }
        });

      this.outildetestDisplayedColumns = ['id', 'outildetest', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceOutilDeTest = new MatTableDataSource();

      this.displayOutilDeTestGrid();
    } catch (exception) {
      console.log('Message d erreur alimoutidetestunix 108!!! \n' + exception);
    }
  }


  displayOutilDeTestGrid() {
    try {
      this.outildetestService.getOutilDeTests().subscribe(dataList => {
        this.dataSourceOutilDeTest.data = dataList;
      });
    } catch (exception) {
      console.log('Message d erreur alimoutidetestunix 115!!! \n' + exception);
    }
  }



  onSubmitOutilDeTest(outildetestFormValues) {
    try {
      // Set Timeline values
      this.outildetest.id = outildetestFormValues.id;
      this.outildetest.outildetest = outildetestFormValues.outildetest;
      if (this.actionFormStatus == 'ADD') {
        this.outildetestService.create(this.outildetest).subscribe(() => this.location.back());
      }
      if (this.actionFormStatus == 'UPDATE') {
        this.outildetestService.update(this.outildetest).subscribe(() => this.location.back());
      }
    } catch (exception) {
      console.log('Message d erreur alimoutidetestunix 134!!! \n' + exception);
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.outildetestForm.controls[controlName].hasError(errorName);
  }


  public onCancel = () => {
    try {
      this.location.back();
    } catch (exception) {
      console.log('Message d erreur alimoutidetestunix 115!!! \n' + exception);
    }
  }

}
