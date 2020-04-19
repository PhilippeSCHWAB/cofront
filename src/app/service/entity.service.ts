import { Injectable } from '@angular/core';
import { Entity } from '../interface/interfaceEntity';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class EntityService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private entity: Entity[] = [];
  /*entity: Observable<Entity[]>;
 */
  private URL_BDDS = 'http://localhost:8080/api/entity';
  private URL_BDDS2 = 'http://localhost:8080/api/entity/1201';

  constructor(
    private http: HttpClient) {
    /*
      this.getEntitysObservable();
      this.entity = this.getEntitysObservable();
  */
  }



  public getEntitys(): Observable<Entity[]> {
    // If not, load timelines JSON collection
    return this.http.get<Entity[]>(this.URL_BDDS)
      // Perfom these actions when loading complete
      .pipe(
        // Save and sort the loaded datalist into the timelines array
        tap(dataList => this.entity = dataList.sort((a, b) =>
        (a.entite > b.entite) ? 1 : ((b.entite > a.entite) ? -1 : 0))),
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

  public create(entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(this.URL_BDDS, entity, this.httpOptions);
  }



  /**
 * Update a entity
 * @return
 */

  public update(entity: Entity): Observable<Entity> {

  //  alert('update entity : '+ entity);
    return this.http.put<Entity>(this.URL_BDDS2, entity, this.httpOptions);
  }








}
