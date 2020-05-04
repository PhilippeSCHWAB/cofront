import { Injectable } from '@angular/core';
import { ServeurUnix } from '../interface/interfaceUnixServer';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ServeurUnixService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private serveurunix: ServeurUnix[] = [];

  private URL_BDDS = 'http://localhost:8080/api/serveurunix';
  private URL_BDDS2 = 'http://localhost:8080/api/serveurunix/1201';

  constructor(
    private http: HttpClient) {
  }



  public getServeurUnixs(): Observable<ServeurUnix[]> {
    // If not, load timelines JSON collection
    return this.http.get<ServeurUnix[]>(this.URL_BDDS)
      // Perfom these actions when loading complete
      .pipe(
        // Save and sort the loaded datalist into the timelines array
        tap(dataList => this.serveurunix = dataList.sort((a, b) =>
          (a.serveurunix > b.serveurunix) ? 1 : ((b.serveurunix > a.serveurunix) ? -1 : 0))),
        // Generic error handler
        catchError(this.handleError)
      );
  }


  /*
   * Get timeline Card
   * @return Card
   */

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


  public create(serveurunix: ServeurUnix): Observable<ServeurUnix> {
    try {
      return this.http.post<ServeurUnix>(this.URL_BDDS, serveurunix, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur serveurunixService 71!!! \n' + exception);
    }
  }

  /*
   * Update a serveurunix
   * @return
   */

  public update(serveurunix: ServeurUnix): Observable<ServeurUnix> {
    try {
      return this.http.put<ServeurUnix>(this.URL_BDDS2, serveurunix, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur serveurunixService 71!!! \n' + exception);
    }
  }



  public delete(serveurunix: ServeurUnix): Observable<ServeurUnix> {
    try {
      return this.http.delete<ServeurUnix>(this.URL_BDDS + '/' + serveurunix);
    } catch (exception) {
      console.log('Message d erreur serveurunixService 71!!! \n' + exception);
    }
  }




}
