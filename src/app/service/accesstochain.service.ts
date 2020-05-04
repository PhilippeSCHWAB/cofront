import { Injectable } from '@angular/core';
import { Bdd } from '../interface/interfaceaccesstochain';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AccesstochainService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private bdd: Bdd[] = [];
  private URL_BDDS = 'http://localhost:8080/api/accesauxchaines';
  private URL_BDDS2 = 'http://localhost:8080/api/accesauxchaines/1201';

  constructor(
    private http: HttpClient) {
  }



  public getBdds(): Observable<Bdd[]> {
    // If not, load timelines JSON collection
    return this.http.get<Bdd[]>(this.URL_BDDS)
      // Perfom these actions when loading complete
      .pipe(
        // Save and sort the loaded datalist into the timelines array
        tap(dataList => this.bdd = dataList.sort((a, b) =>
        (a.accesauxchaines > b.accesauxchaines) ? 1 : ((b.accesauxchaines > a.accesauxchaines) ? -1 : 0))),
        // Generic error handler
        catchError(this.handleError)
      );
  }

   /**
    * Get timeline Card
    * @return Card
    */

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

  public create(bdd: Bdd): Observable<Bdd> {
    try {
      return this.http.post<Bdd>(this.URL_BDDS, bdd, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur bddService 68!!! \n' + exception);
    }
  }



  public update(bdd: Bdd): Observable<Bdd> {
    try {
      return this.http.put<Bdd>(this.URL_BDDS2, bdd, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur bddService 83!!! \n' + exception);
    }
  }



 public delete(bdd: Bdd): Observable<Bdd> {
  try {
    return this.http.delete<Bdd>(this.URL_BDDS + '/' + bdd);
  } catch (exception) {
    console.log('Message d erreur bddService 93!!! \n' + exception);
  }
  }




}
