import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { User } from './interfaceUser';
import { Observable , throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

//const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'my-auth-token' }) };

@Injectable({
  providedIn: 'root'
})

export class UserService {


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private user: User[] = [];

 // user: Observable<User[]>;

  private URL_BDDS = 'http://localhost:8080/api/user';
  private URL_BDDS2 = 'http://localhost:8080/api/user/62';


  constructor(
    private http: HttpClient) {

  }

  public getUsers(): Observable<User[]> {
    // If not, load timelines JSON collection
    return this.http.get<User[]>(this.URL_BDDS)
      // Perfom these actions when loading complete
      .pipe(
        // Save and sort the loaded datalist into the timelines array
        tap(dataList => this.user = dataList.sort((a, b) =>
        (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))),
        // Generic error handler
        catchError(this.handleError)
      );
  }

  createUsersTestObservable(temporaryUser: User) {
    alert('temporaryuser DC : ' + temporaryUser.datedecreation);
    alert('temporaryuser DM : ' + temporaryUser.datedemodification);
    return this.http
      .post<User>('http://localhost:8080/api/user', temporaryUser, this.httpOptions);
  }

  getFilteredUserList(idSelected) {
    let params = new HttpParams();
    params = params.append('idSelectedForm', idSelected);
    const options = { params: params };
    alert('user service : ' + idSelected);
    return this.http.get('http://localhost:8080/api/user/'+ idSelected);
  }

 /**
   * Manage http error
   * @param err The HttpErrorResponse to manage
   */
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


public create(user: User): Observable<User> {
  return this.http.post<User>(this.URL_BDDS, user, this.httpOptions);
}


public update(user: User): Observable<User> {

  //  alert('update serveurunix : '+ user);
    return this.http.put<User>(this.URL_BDDS2, user, this.httpOptions);
  }


//###### a faire ##########
  public delete(user: User): Observable<User> {
      alert('delete : '+ this.URL_BDDS + '/' + user);
      return this.http.delete<User>(this.URL_BDDS + '/' + user);
    }




/*
    deleteChainsTestObservable(chainnomdelachaine: string): Observable<any> {
      alert('chain service : ' + chainnomdelachaine);
      return this.httpClient.delete<Chain[]>('http://localhost:8080/postgresstchaine/' + chainnomdelachaine);
    }
*/
}
