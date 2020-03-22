import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { User } from './interfaceUser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import { interfaceUser } from './interfaceUser';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'my-auth-token' }) };

@Injectable({
  providedIn: 'root'
})

export class UserService {
  users: User[] = [];
  user: Observable<User[]>;

  constructor(private httpClient: HttpClient) {
    this.getUsersTestObservable();
    this.user = this.getUsersTestObservable();
  }

  /**
   * Get ListUsers
   * @return : Liste des users
   */
  getUsersTestObservable(): Observable<User[]> {

    return this.httpClient
      .get<User[]>('http://localhost:8080/postgressTlist/tuserList')
      .pipe(tap(dataList => (this.users = dataList)));
  }

  createUsersTestObservable(temporaryUser: User) {
    alert('temporaryuser DC : ' + temporaryUser.datedecreation);
    alert('temporaryuser DM : ' + temporaryUser.datedemodification);
    return this.httpClient
      .post<User>('http://localhost:8080/postgressTlist/createTUser', temporaryUser, httpOptions);
  }


  getFilteredUserList(iudSelected) {
    let params = new HttpParams();
    params = params.append('iudSelectedForm', iudSelected);
    const options = { params: params };
    alert('user service : ' + iudSelected);
    return this.httpClient.get('http://localhost:8080/postgressTlist/filter/'+ iudSelected);
  }

/*
 public updateCard(timelineId, card): Observable<Card> {
    const url = this.URL_TIMELINES_LIST + timelineId + '/card';
    return this.httpClient.put<Card>(url, card);
  }
*/

  putUpdateUserObservable(userIud: string, user): Observable<User> {

    const url = 'http://localhost:8080/postgressTlist/updateTUser/' + userIud  + '/user';


    return this.httpClient.put<User>(url, user);
  }


  deleteUsersTestObservable(userIud: string): Observable<any> {
    alert('user service : ' + userIud);
    return this.httpClient.delete<User[]>('http://localhost:8080/postgressTlist/' + userIud);
  }

}
