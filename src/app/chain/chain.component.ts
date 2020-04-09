import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChainService } from '../chain.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Chain } from '../interfaceChain';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';//update
import { Location, getLocaleDateTimeFormat } from '@angular/common';

/*
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


export class InputErrorStateMatcherExample {
  chainForm = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
}
*/
@Component({
  selector: 'app-chain',
  templateUrl: './chain.component.html',
  styleUrls: ['./chain.component.css']
})
export class ChainComponent implements OnInit {

  //temporaryChain: Chain;


  public chain: Chain; //= new Chain();
  public chainForm: FormGroup;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public dataSourceChain: MatTableDataSource<Chain>;

  chainDisplayedColumns: string[];


  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string;
  formSubtitleLabel: string;
  paramId;


  /*

    @Input() chains;
    matRadioGroup: any;

    chainForm = this.formBuilder.group({

      nomdelachaine: '',
      shortname: '',
      accesauxchaines: '',
      codeenvironnement: '',
      ibmexportpath: '',
      buildpath: '',
      rpmpath: '',
      langage: '',
      outildetest: '',
      version: '',
      sed: '',
      optiondecimal: '',
      optionpmml: '',
      callsed: '',
      applicationappelante: '',
      business: '',
      prod: '',
      groupe: '',
      datedecreation: '',
      auteurcreation: '',
      datedemodification: '',
      auteurdemodification: ''
    })
  */
  constructor(
    private formBuilder: FormBuilder,
    private chainService: ChainService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.chainForm = new FormGroup({
      nomdelachaine: new FormControl(''),
      shortname: new FormControl(''),
      accesauxchaines: new FormControl(''),
      codeenvironnement: new FormControl(''),
      ibmexportpath: new FormControl(''),
      buildpath: new FormControl(''),
      rpmpath: new FormControl(''),
      langage: new FormControl(''),

      outildetest: new FormControl(''),
      version: new FormControl(''),
      sed: new FormControl(''),
      optiondecimal: new FormControl(''),
      optionpmml: new FormControl(''),
      callsed: new FormControl(''),
      applicationappelante: new FormControl(''),
      business: new FormControl(''),

      prod: new FormControl(''),
      groupe: new FormControl(''),
      datedecreation: new FormControl(''),
      auteurcreation: new FormControl(''),
      datedemodification: new FormControl(''),
      auteurdemodification: new FormControl('')
    });

    this.chainDisplayedColumns = ['nomdelachaine','shortname','accesauxchaines','codeenvironnement','ibmexportpath',
     'buildpath','rpmpath','langage','outildetest','version','sed','optiondecimal','optionpmml','callsed',
     'applicationappelante','business','prod','groupe','datedecreation','auteurcreation','datedemodification',
      'auteurdemodification'];




    // Get recieved chain id
    this.route.paramMap.subscribe(
      params => {
        // Get param Id
        this.paramId = params.get('chain.id');
        //  alert(this.paramId);
        if (params.get('chain.id') != null) {
          alert('UPDATE');
          this.actionFormStatus = 'UPDATE';

          this.chainForm = new FormGroup({
            id: new FormControl(''),
            nomdelachaine: new FormControl(''),
            shortname: new FormControl(''),
            accesauxchaines: new FormControl(''),
            codeenvironnement: new FormControl(''),
            ibmexportpath: new FormControl(''),
            buildpath: new FormControl(''),
            rpmpath: new FormControl(''),
            langage: new FormControl(''),

            outildetest: new FormControl(''),
            version: new FormControl(''),
            sed: new FormControl(''),
            optiondecimal: new FormControl(''),
            optionpmml: new FormControl(''),
            callsed: new FormControl(''),
            applicationappelante: new FormControl(''),
            business: new FormControl(''),

            prod: new FormControl(''),
            groupe: new FormControl(''),
            datedecreation: new FormControl(''),
            auteurcreation: new FormControl(''),
            datedemodification: new FormControl(''),
            auteurdemodification: new FormControl('')
          });



          this.chainService.getChains().subscribe((chains: Chain[]) => {
            // Get Timeline by id
            this.chain = chains.filter(t => t.id === parseInt(this.paramId))[0];
            this.dataSourceChain = new MatTableDataSource();
            alert(this.chain.id + ' / ' + this.chain.nomdelachaine + ' / ' + this.chain.accesauxchaines);
            this.chainForm.setValue({
              id: this.chain.id,
              nomdelachaine: this.chain.nomdelachaine,
              shortname: this.chain.shortname,
              accesauxchaines: this.chain.codeenvironnement,
              codeenvironnement: this.chain.codeenvironnement,
              ibmexportpath: this.chain.ibmexportpath,
              buildpath: this.chain.buildpath,
              rpmpath: this.chain.rpmpath,
              langage: this.chain.langage,

              outildetest: this.chain.outildetest,
              version: this.chain.version,
              sed: this.chain.sed,
              optiondecimal: this.chain.optiondecimal,
              optionpmml: this.chain.optionpmml,
              callsed: this.chain.callsed,
              applicationappelante: this.chain.applicationappelante,
              business: this.chain.business,

              prod: this.chain.prod,
              groupe: this.chain.groupe,
              datedecreation: this.chain.datedecreation,
              auteurcreation: this.chain.auteurcreation,
              datedemodification: this.chain.datedemodification,
              auteurdemodification: this.chain.auteurdemodification
            });
            this.formTitleLabel = 'Formulaire de modification 6:01';
            this.formSubtitleLabel = 'Modifier un Chain';
          });
        }
        else {
          //  alert('ADD');
          this.actionFormStatus = 'ADD',
            this.chainForm = new FormGroup({
              nomdelachaine: new FormControl(''),
              shortname: new FormControl(''),
              accesauxchaines: new FormControl(''),
              codeenvironnement: new FormControl(''),
              ibmexportpath: new FormControl(''),
              buildpath: new FormControl(''),
              rpmpath: new FormControl(''),
              langage: new FormControl(''),

              outildetest: new FormControl(''),
              version: new FormControl(''),
              sed: new FormControl(''),
              optiondecimal: new FormControl(''),
              optionpmml: new FormControl(''),
              callsed: new FormControl(''),
              applicationappelante: new FormControl(''),
              business: new FormControl(''),

              prod: new FormControl(''),
              groupe: new FormControl(''),
              datedecreation: new FormControl(''),
              auteurcreation: new FormControl(''),
              datedemodification: new FormControl(''),
              auteurdemodification: new FormControl('')
            });

          this.formTitleLabel = 'Formulaire d\'ajout 10h15';
          this.formSubtitleLabel = 'Ajouter une nouvelle Chaine 8h09';
          this.dataSourceChain = new MatTableDataSource();
          this.dataSourceChain.paginator = this.paginator;
          this.dataSourceChain.sort = this.sort;
        }
      });

    this.chainDisplayedColumns = ['id','nomdelachaine','shortname','accesauxchaines','codeenvironnement','ibmexportpath',
     'buildpath','rpmpath','langage','outildetest','version','sed','optiondecimal','optionpmml','callsed',
     'applicationappelante','business','prod','groupe','datedecreation','auteurcreation','datedemodification',
     'auteurdemodification'];

    this.dataSourceChain = new MatTableDataSource();

    this.displayChainGrid();
  }





  displayChainGrid() {
    // Load chain list from the associate service
    // and subscribe to the callback when loading complete
    this.chainService.getChains().subscribe(dataList => {
      this.dataSourceChain.data = dataList;
    });
  }




  hasError = (controlName: string, errorName: string) => {
    return this.chainForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }


  onCreateChain(chain) {
    chain.datedecreation = new Date().toISOString();
    chain.datedemodification = new Date().toISOString();
    this.chainService.createChainsTestObservable(chain).subscribe(savedChain => console.log(savedChain));
    alert('L\'utilisateur est enregistré');
    this.location.back();
    //console.log(chain);
    // console.log(chain.datedecreation);
    //  this.location.back();
  }




}
