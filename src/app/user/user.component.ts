import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../interfaceUser';
import { Location, getLocaleDateTimeFormat } from '@angular/common';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { timestamp } from 'rxjs/operators';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';//update
import { Observable } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class InputErrorStateMatcherExample {
  reviewForm = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  dataSourceUser: MatTableDataSource<User>;

  temporaryUser: User;

  @Input() reviews;
  matRadioGroup: any;

  reviewForm = this.formBuilder.group({
    //  note: 3,
    // comment: '',
    iud: '',
    nom: '',
    prenom: '',
    email: new FormControl('', [Validators.required, Validators.email]),
    entite: '',
    ismanager: 'false',
    emailmanager: new FormControl('', [Validators.required, Validators.email]),
    isadmin: 'false',
    accesauxchaines: '',
    serveurunix: '',
    loginunix: '',
    datedecreation: '',
    auteurcreation: '',
    datedemodification: '',
    auteurdemodification: '',
    refmyaccess: ''
  })

  //// ** Gestion Email ** ////
  email2 = new FormControl('', [Validators.required, Validators.email]);
  paramIud: string; // update
  private actionFormStatus: string; // To define if the form utility. Acceptable values = ADD / UPDATE
  private user: Observable<User[]>;
  userList = this.userService.users;
  userForm;
  users: any;




  getErrorMessage() {
    if (this.email2.hasError('required')) {
      return 'You must enter email valid';
    }
    return this.email2.hasError('email') ? 'Not a valid email' : '';
  }


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute
  ) { }



  ngOnInit() {

    this.route.paramMap.subscribe(
      params => {
        // Get param Iud
        this.paramIud = params.get('user.iud');
        alert("jjj : " + this.paramIud);
        //     this.dataSourceUser.filter = this.paramIud;
      }
    )

    this.users = this.userService.getFilteredUserList(this.paramIud);
    alert("kkk : " + this.userService.getFilteredUserList(this.paramIud));



  }



  hasError = (controlName: string, errorName: string) => {
    return this.reviewForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }




     displayUserGrid() {
      // Load timeline list from the associate service
      // and subscribe to the callback when loading complete
      this.userService.getUsersTestObservable().subscribe(dataList => {
        this.dataSourceUser.data = dataList;
      });
    }

    onReview(review) {
      review.datedecreation = new Date().toISOString();
      review.datedemodification = new Date().toISOString();
      this.userService.createUsersTestObservable(review).subscribe(savedReview => console.log(savedReview));
      alert('L\'utilisateur est enregistré');
      this.location.back();
      //console.log(review);
      // console.log(review.datedecreation);
      //  this.location.back();
    }



}
