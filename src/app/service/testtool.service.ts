import { Injectable } from '@angular/core';
import { OutilDeTest } from '../interface/interfaceTestTool';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class TesttoolService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private outildetest: OutilDeTest[] = [];

  private URL_BDDS = 'http://localhost:8080/api/outildetest';
  private URL_BDDS2 = 'http://localhost:8080/api/outildetest/1201';

  constructor(
    private http: HttpClient) {
  }



  public getOutilDeTests(): Observable<OutilDeTest[]> {
    // If not, load timelines JSON collection
    return this.http.get<OutilDeTest[]>(this.URL_BDDS)
      // Perfom these actions when loading complete
      .pipe(
        // Save and sort the loaded datalist into the timelines array
        tap(dataList => this.outildetest = dataList.sort((a, b) =>
          (a.outildetest > b.outildetest) ? 1 : ((b.outildetest > a.outildetest) ? -1 : 0))),
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

  public create(outildetest: OutilDeTest): Observable<OutilDeTest> {
    try {
      return this.http.post<OutilDeTest>(this.URL_BDDS, outildetest, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur outildetestService 71!!! \n' + exception);
    }
  }



  public update(outildetest: OutilDeTest): Observable<OutilDeTest> {
    try {
      return this.http.put<OutilDeTest>(this.URL_BDDS2, outildetest, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur outildetestService 81!!! \n' + exception);
    }
  }


  public delete(outildetest: OutilDeTest): Observable<OutilDeTest> {
    try {
      return this.http.delete<OutilDeTest>(this.URL_BDDS + '/' + outildetest);
    } catch (exception) {
      console.log('Message d erreur outildetestService 90!!! \n' + exception);
    }
  }


}
