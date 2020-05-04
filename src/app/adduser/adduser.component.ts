import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../interface/interfaceUser';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // update
import { Location, getLocaleDateTimeFormat } from '@angular/common';
/*import { FormsModule, ReactiveFormsModule } from '@angular/forms';*/





@Component({
  selector: 'app-user',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})



export class UserComponent implements OnInit {
  typesOfEntity: any;
  typesOfServerUnix: any;
  public user: User; // = new User();
  public userForm: FormGroup;
  /*
  imports: [
  FormsModule,
  ReactiveFormsModule];
  */
  isManagerChecked: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public dataSourceUser: MatTableDataSource<User>;

  userDisplayedColumns: string[];


  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  formTitleLabel: string;
  formSubtitleLabel: string;
  paramId: any;

  //// ** Gestion Email ** ////
  email2 = new FormControl('', [Validators.required, Validators.email]);


  getErrorMessage() {
    if (this.email2.hasError('required')) {
      return 'You must enter email valid';
    }
    return this.email2.hasError('email') ? 'Not a valid email' : '';
  }


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }



  ngOnInit() {
    try {
      this.userForm = new FormGroup({
        iud: new FormControl(''),
        nom: new FormControl(''),
        prenom: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        entite: new FormControl(''),
        ismanager: new FormControl(''),
        emailmanager: new FormControl('', [Validators.required, Validators.email]),
        isadmin: new FormControl(''),
        accesauxchaines: new FormControl(''),
        serveurunix: new FormControl(''),
        loginunix: new FormControl(''),
        datedecreation: new FormControl(''),
        auteurcreation: new FormControl(''),
        datedemodification: new FormControl(''),
        auteurdemodification: new FormControl(''),
        refmyaccess: new FormControl('')
      });

      this.userDisplayedColumns = ['iud', 'nom', 'prenom', 'email', 'entite', 'ismanager', 'emailmanager', 'isadmin',
        'accesauxchaines', 'serveurunix', 'loginunix', 'datedecreation', 'auteurcreation', 'datedemodification', 'auteurdemodification',
        'refmyaccess'];

      // Get recieved user id
      this.route.paramMap.subscribe(
        params => {
          // Get param Id
          this.paramId = params.get('user.id');
          //  alert(this.paramId);
          if (params.get('user.id') != null) {
            //   alert('UPDATE');
            this.actionFormStatus = 'UPDATE';

            this.userForm = new FormGroup({
              id: new FormControl(''),
              iud: new FormControl('555'),
              nom: new FormControl(''),
              prenom: new FormControl(''),
              email: new FormControl('', [Validators.required, Validators.email]),
              entite: new FormControl(''),
              ismanager: new FormControl(''),
              emailmanager: new FormControl('', [Validators.required, Validators.email]),
              isadmin: new FormControl(''),
              accesauxchaines: new FormControl(''),
              serveurunix: new FormControl(''),
              loginunix: new FormControl(''),
              datedecreation: new FormControl(''),
              auteurcreation: new FormControl(''),
              datedemodification: new FormControl(''),
              auteurdemodification: new FormControl(''),
              refmyaccess: new FormControl('')
            });



            this.userService.getUsers().subscribe((users: User[]) => {
              // Get Timeline by id
              this.user = users.filter(t => t.id === parseInt(this.paramId))[0];
              this.dataSourceUser = new MatTableDataSource();
              // alert(this.user.id + ' / ' + this.user.nom + ' / ' + this.user.serveurunix);
              this.userForm.setValue({
                id: this.user.id,
                iud: this.user.iud,
                nom: this.user.nom,
                prenom: this.user.prenom,
                email: this.user.email,
                entite: this.user.entite,
                ismanager: this.user.ismanager,
                emailmanager: this.user.emailmanager,
                isadmin: this.user.isadmin,
                accesauxchaines: this.user.accesauxchaines,
                serveurunix: this.user.serveurunix,
                loginunix: this.user.loginunix,
                datedecreation: this.user.datedecreation,
                auteurcreation: this.user.auteurcreation,
                datedemodification: this.user.datedemodification,
                auteurdemodification: this.user.auteurdemodification,
                refmyaccess: this.user.refmyaccess
              });
              this.formTitleLabel = 'Formulaire de modification 6:01';
              this.formSubtitleLabel = 'Modifier un User';


            });
          } else {
            //  alert('ADD');
            this.actionFormStatus = 'ADD',

              this.userForm = new FormGroup({
                // id: new FormControl(''),
                iud: new FormControl(''),
                nom: new FormControl(''),
                prenom: new FormControl(''),
                email: new FormControl('', [Validators.required, Validators.email]),
                entite: new FormControl(''),
                ismanager: new FormControl(''),
                emailmanager: new FormControl('', [Validators.required, Validators.email]),
                isadmin: new FormControl(''),
                accesauxchaines: new FormControl(''),
                serveurunix: new FormControl(''),
                loginunix: new FormControl(''),
                datedecreation: new FormControl(''),
                auteurcreation: new FormControl(''),
                datedemodification: new FormControl(''),
                auteurdemodification: new FormControl(''),
                refmyaccess: new FormControl('')
              });

            this.formTitleLabel = 'Formulaire d\'ajout USER';
            this.formSubtitleLabel = 'Ajouter un nouveau Timeline 8h09';
            this.dataSourceUser = new MatTableDataSource();
            this.dataSourceUser.paginator = this.paginator;
            this.dataSourceUser.sort = this.sort;
            // ## Checked for display email manager field
            //   this.isManagerChecked = true;
          }
        });

      this.userDisplayedColumns = ['id', 'iud', 'nom', 'prenom', 'email', 'entite', 'ismanager', 'emailmanager', 'isadmin',
        'accesauxchaines', 'serveurunix', 'loginunix', 'datedecreation', 'auteurcreation', 'datedemodification', 'auteurdemodification',
        'refmyaccess'];
      this.dataSourceUser = new MatTableDataSource();

      this.displayUserGrid();

      this.typesOfEntity = this.userService.getEntityList();
      this.typesOfServerUnix = this.userService.getServeurUnixList();

      throw new Error('une exception dans ngOnInit'); // génère une exception manuellement par le code
    } catch (exception) {
      console.log('Message User 204!!! \n' + exception);
    }
    return;
  }


  displayUserGrid() {
    try {
      // Load user list from the associate service
      // and subscribe to the callback when loading complete
      this.userService.getUsers().subscribe(dataList => {
        this.dataSourceUser.data = dataList;
      });
    } catch (exception) {
      console.log('Message d erreur User 221!!! \n' + exception);
    }
  }


  hasError = (controlName: string, errorName: string) => {
    try {
      return this.userForm.controls[controlName].hasError(errorName);
    } catch (exception) {
      console.log('Message d erreur User 226!!! \n' + exception);
    }
  }



  public onCancel = () => {
    try {
      this.location.back();
    } catch (exception) {
      console.log('Message d erreur User 226!!! \n' + exception);
    }
  }


  onCreateUser(user) {
    try {

      if (this.actionFormStatus === 'ADD') {
        user.datedecreation = new Date().toISOString();
      }
      if (this.actionFormStatus === 'UPDATE') {
        user.datedemodification = new Date().toISOString();
      }
      this.userService.createUsersTestObservable(user).subscribe(savedUser => console.log(savedUser));
      alert('L\'utilisateur est enregistré');
      this.location.back();
    } catch (exception) {
      console.log('Message d erreur User 258!!! \n' + exception);
    }
  }


}



