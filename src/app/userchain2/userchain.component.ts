import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../interface/interfaceUser';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';//update
import { Location, getLocaleDateTimeFormat } from '@angular/common';






@Component({
  selector: 'app-userchain-userchain',
  templateUrl: './userchain.component.html',
  styleUrls: ['./userchain.component.css']
})

export class UserchainComponent implements OnInit {





  ngOnInit() {
}

}
