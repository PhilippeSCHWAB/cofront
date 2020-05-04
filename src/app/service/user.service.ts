import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { User } from '../interface/interfaceUser';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
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

  users: User[] = [];
  user: User;
  // user: Observable<User[]>;

  private URL_BDDS = 'http://localhost:8080/api/user';
  private URL_BDDS2 = 'http://localhost:8080/api/user/62';


  constructor(
    private http: HttpClient) { }


  public getEntityList() {
    try {
      return this.http.get('http://localhost:8080/api/entity/entity');
    } catch (exception) {
      console.log('Message d erreur userService 41!!! \n' + exception);
    }
  }


  public getServeurUnixList() {
    try {
      return this.http.get('http://localhost:8080/api/serveurunix/serveurunix');
    } catch (exception) {
      console.log('Message d erreur userService 50!!! \n' + exception);
    }
  }

  public getUsers(): Observable<User[]> {
    try {
      // If not, load timelines JSON collection
      return this.http.get<User[]>(this.URL_BDDS)
        // Perfom these actions when loading complete
        .pipe(
          // Save and sort the loaded datalist into the timelines array
          tap(dataList => this.users = dataList.sort((a, b) =>
            (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))),
          // Generic error handler
          catchError(this.handleError)
        );
    } catch (exception) {
      console.log('Message d erreur userService 50!!! \n' + exception);
    }
  }

  createUsersTestObservable(temporaryUser: User) {
    try {
      return this.http
        .post<User>(this.URL_BDDS, temporaryUser, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur userService 78!!! \n' + exception);
    }
  }

  public getFilteredUserList(idSelected): Observable<User> {
    try {
      let params = new HttpParams();
      params = params.append('idSelectedForm', idSelected);
      const options = { params: params };
      // If not, load timelines JSON collection
      return this.http.get<User>(this.URL_BDDS + '/' + idSelected);
      // Perfom these actions when loading complete
    } catch (exception) {
      console.log('Message d erreur userService 91!!! \n' + exception);
    }
  }

  /*
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
    try {
      return this.http.post<User>(this.URL_BDDS, user, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur userService 114!!! \n' + exception);
    }
  }

  public createChainToUser(user: User): Observable<User> {
    try {
      return this.http.post<User>(this.URL_BDDS, user, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur userService 122!!! \n' + exception);
    }
  }

  public update(user: User): Observable<User> {
    try {
      return this.http.put<User>(this.URL_BDDS2, user, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur userService 122!!! \n' + exception);
    }
  }


  public delete(user: User): Observable<User> {
    try {
      return this.http.delete<User>(this.URL_BDDS + '/' + user);
    } catch (exception) {
      console.log('Message d erreur userService 122!!! \n' + exception);
    }
  }

}
