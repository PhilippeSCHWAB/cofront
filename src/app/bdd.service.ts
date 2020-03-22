import { Injectable } from '@angular/core';
import { Bdd } from './interfaceBdd';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


/*
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'my-auth-token' }) };
*/
@Injectable({
  providedIn: 'root'
})

export class BddService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private bdd: Bdd[] = [];
  /*bdd: Observable<Bdd[]>;
 */
  private URL_BDDS = 'http://localhost:8080/api/bdd';
  private URL_BDDS2 = 'http://localhost:8080/api/bdd/1201';

  constructor(
    private http: HttpClient) {
    /*
      this.getBddsObservable();
      this.bdd = this.getBddsObservable();
  */
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
  //  this.URL_BDDS=this.URL_BDDS+'//accesauxchaines';
 //   alert('mon new url :'+ this.URL_BDDS);
    return this.http.post<Bdd>(this.URL_BDDS, bdd, this.httpOptions);
  }



  /**
 * Update a bdd
 * @return
 */

  public update(bdd: Bdd): Observable<Bdd> {

  //  alert('update bdd : '+ bdd);
    return this.http.put<Bdd>(this.URL_BDDS2, bdd, this.httpOptions);
  }








}
