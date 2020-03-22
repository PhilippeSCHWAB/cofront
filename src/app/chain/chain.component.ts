import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChainService } from '../chain.service';
import { Chain } from '../interfaceChain';
import { Location, getLocaleDateTimeFormat } from '@angular/common';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

@Component({
  selector: 'app-chain',
  templateUrl: './chain.component.html',
  styleUrls: ['./chain.component.css']
})
export class ChainComponent implements OnInit {

  temporaryChain: Chain;

  @Input() chains;
  matRadioGroup: any;

  chainForm = this.formBuilder.group({

    nomdelachaine: '',
    shortname: '',
    accessauxchaines: '',
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

  constructor(
    private formBuilder: FormBuilder,
    private chainService: ChainService,
    private location: Location) { }


  ngOnInit() {
  }


  onCreateChain(ChainRecord) {
    ChainRecord.datedecreation = new Date().toISOString();
    ChainRecord.datedemodification = new Date().toISOString();
    ChainRecord.auteurcreation = 'moi';

    alert(ChainRecord.nomdelachaine);
    this.chainService.createChainTestObservable(ChainRecord).subscribe(savedChainRecord => console.log(savedChainRecord));
    console.log(ChainRecord);
    alert('La chaine est enregistrée');
    this.location.back();
  }



  hasError = (controlName: string, errorName: string) => {
    return this.chainForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }


}
