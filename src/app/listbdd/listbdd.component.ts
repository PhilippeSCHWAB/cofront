
import { Component, OnInit, ViewChild, SystemJsNgModuleLoader } from '@angular/core';
import { AccesstochainService } from '../service/accesstochain.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Bdd } from '../interface/interfaceaccesstochain';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-bddlistparam',
  templateUrl: './listbdd.component.html',
  styleUrls: ['./listbdd.component.css']
})


export class BddlistparamComponent implements OnInit {
  dataSourceBdd: MatTableDataSource<Bdd>;
  bddDisplayedColumns: string[];
  bdds:any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    //private formBuilder: FormBuilder,
    private bddService: AccesstochainService,
    // private route: ActivatedRoute
  ) { }

  ngOnInit() {
    try {
      this.bddDisplayedColumns = ['id', 'accesauxchaines', 'createdAt', 'updatedAt', 'edit', 'delete'];
      this.dataSourceBdd = new MatTableDataSource();
      this.displayBddGrid();
    } catch (exception) {
      console.log('Message d erreur bddList 38!!! \n' + exception);
    }
    }


  displayBddGrid() {
    try {
      this.bddService.getBdds().subscribe(dataList => {
        this.dataSourceBdd.data = dataList;
      });
    } catch (exception) {
      console.log('Message d erreur bddList 50!!! \n' + exception);
    }
  }


  onDeleteBdd(bddid){
    try {
      this.bddService.delete(bddid).subscribe(() => this.bdds = this.displayBddGrid());
    } catch (exception) {
      console.log('Message d erreur bddList 59!!! \n' + exception);
    }
  }



}
