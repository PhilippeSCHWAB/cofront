import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';


import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuForm = new FormControl('', [
    Validators.required,

  ]);

  private nomdelabdd: string;//Alim 4 base par variable
  constructor() { }

  ngOnInit() {
  }

  onSelectMenu(menuFormvalue) {
    alert(menuFormvalue);
  }

}


