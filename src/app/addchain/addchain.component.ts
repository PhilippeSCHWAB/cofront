import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TchainesService } from '../service/tchaines.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TChaines } from '../interface/interfaceTChain';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { Location, getLocaleDateTimeFormat } from '@angular/common';
import { OutilDeTest } from '../interface/interfaceTestTool';
import { TesttoolService } from '../service/testtool.service';

@Component({
  selector: 'app-chain',
  templateUrl: './addchain.component.html',
  styleUrls: ['./addchain.component.css']
})
export class ChainComponent implements OnInit {

  typesOfOutilDeTest: any;
  typesOfAccesAuxChaines: any;

  outildetestList;

  public chain: TChaines; // = new TChaines();
  public chainForm: FormGroup;
  dataSourceOutilDeTest: MatTableDataSource<OutilDeTest>;
  outildetestDisplayedColumns: string[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public dataSourceChain: MatTableDataSource<TChaines>;

  chainDisplayedColumns: string[];


  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string;
  formSubtitleLabel: string;
  paramId;

  constructor(
    private formBuilder: FormBuilder,
    private chainService: TchainesService,
    private route: ActivatedRoute,
    private location: Location,
    private outildetestService: TesttoolService,
  ) { }

  ngOnInit() {
    try {
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
      this.chainDisplayedColumns = ['nomdelachaine', 'shortname', 'accesauxchaines', 'codeenvironnement', 'ibmexportpath',
        'buildpath', 'rpmpath', 'langage', 'outildetest', 'version', 'sed', 'optiondecimal', 'optionpmml', 'callsed',
        'applicationappelante', 'business', 'prod', 'groupe', 'datedecreation', 'auteurcreation', 'datedemodification',
        'auteurdemodification'];
      // Get recieved chain id
      this.route.paramMap.subscribe(
        params => {
          // Get param Id
          this.paramId = params.get('chain.id');
          //  alert(this.paramId);
          if (params.get('chain.id') != null) {
            //    alert('UPDATE');
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
            }), error => console.log(error + 'erreur lors du subscribe 113');
            this.chainService.getChains().subscribe((chains: TChaines[]) => {
              // Get  by id
              this.chain = chains.filter(t => t.id === parseInt(this.paramId))[0];
              this.dataSourceChain = new MatTableDataSource();
              this.isCheckedoptionpmml(this.chain.prod);
              this.chainForm.setValue({
                id: this.chain.id,
                nomdelachaine: this.chain.nomdelachaine,
                shortname: this.chain.shortname,
                accesauxchaines: this.chain.accesauxchaines,
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
                prod: this.chain.optionpmml,
                groupe: this.chain.groupe,
                datedecreation: this.chain.datedecreation,
                auteurcreation: this.chain.auteurcreation,
                datedemodification: this.chain.datedemodification,
                auteurdemodification: this.chain.auteurdemodification
              }), error => console.log(error + 'erreur lors du subscribe 143');
              this.formTitleLabel = 'Formulaire de modification 6:01';
              this.formSubtitleLabel = 'Modifier un TChaines';
            });
          } else {
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

      this.chainDisplayedColumns = ['id', 'nomdelachaine', 'shortname', 'accesauxchaines', 'codeenvironnement', 'ibmexportpath',
        'buildpath', 'rpmpath', 'langage', 'outildetest', 'version', 'sed', 'optiondecimal', 'optionpmml', 'callsed',
        'applicationappelante', 'business', 'prod', 'groupe', 'datedecreation', 'auteurcreation', 'datedemodification',
        'auteurdemodification'];

      this.dataSourceChain = new MatTableDataSource();

      this.displayChainGrid();
      this.typesOfOutilDeTest = this.chainService.getOutilDeTestList();
      this.typesOfAccesAuxChaines = this.chainService.getAccessAuxChainesList();

    } catch (exception) {
      console.log('Message d erreur chain 194!!! \n' + exception);
    }
  }


  displayChainGrid() {
    // Load chain list from the associate service
    // and subscribe to the callback when loading complete
    this.chainService.getChains().subscribe(dataList => {
      this.dataSourceChain.data = dataList, error => console.log(error + 'erreur lors du subscribe 204');
    });
  }




  hasError = (controlName: string, errorName: string) => {
    return this.chainForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    try {
      this.location.back();
    } catch (exception) {
      console.log('Message d erreur chain 209!!! \n' + exception);
    }
  }


  onCreateChain(chain) {
    try {
      if (this.actionFormStatus === 'ADD') {
        chain.datedecreation = new Date().toISOString();
      }
      if (this.actionFormStatus === 'UPDATE') {
        chain.datedemodification = new Date().toISOString();
      }
    } catch (exception) {
      console.log('Message d erreur chain 236!!! \n' + exception);
    }

    this.chainService.createChainsTestObservable(chain).subscribe(savedChain => console.log(savedChain)),
    error => console.log(error + 'erreur lors du subscribe 235');
    alert('L\'utilisateur est enregistré');
    this.location.back();
  }

  isCheckedoptionpmml(valor) {
    try {
      return valor;
    } catch (exception) {
      console.log('Message d erreur chain 255!!! \n' + exception);
    }
  }


}
