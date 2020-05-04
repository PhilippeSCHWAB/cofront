import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { TChaines } from '../interface/interfaceTChain';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { OutilDeTest } from '../interface/interfaceTestTool';

@Injectable({
  providedIn: 'root'
})

export class TchainesService {


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private chain: TChaines[] = [];
  private outildetestvalor: OutilDeTest[] = [];
  // chain: Observable<Chain[]>;

  private URL_BDDS = 'http://localhost:8080/api/chaine';
  private URL_BDDS2 = 'http://localhost:8080/api/chaine/62';
  private URL_BDDS3 = 'http://localhost:8080/api/user';


  constructor(
    private http: HttpClient) {
  }


  // recupération des valeurs des tables de paramettrage
  public getOutilDeTestList() {
    try {
      return this.http.get('http://localhost:8080/api/outildetest/outildetest');
    } catch (exception) {
      console.log('Message d erreur chainService 41!!! \n' + exception);
    }
  }


  public getAccessAuxChainesList() {
    try {
      return this.http.get('http://localhost:8080//api/accesauxchaines/accesauxchaines');
    } catch (exception) {
      console.log('Message d erreur chainService 50!!! \n' + exception);
    }
  }


  public getChains(): Observable<TChaines[]> {
    // If not, load timelines JSON collection
    return this.http.get<TChaines[]>(this.URL_BDDS)
      // Perfom these actions when loading complete
      .pipe(
        // Save and sort the loaded datalist into the timelines array
        tap(dataList => this.chain = dataList.sort((a, b) =>
          (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))),
        // Generic error handler
        catchError(this.handleError)
      );
  }

  createChainsTestObservable(temporaryChain: TChaines) {
    try {
      return this.http
        .post<TChaines>('http://localhost:8080/api/chaine', temporaryChain, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur chainService 73!!! \n' + exception);
    }

  }

  getFilteredChainList(idSelected) {
    try {
      let params = new HttpParams();
      params = params.append('idSelectedForm', idSelected);
      const options = { params: params };
      return this.http.get('http://localhost:8080/api/chaine/' + idSelected);
    } catch (exception) {
      console.log('Message d erreur chainService 85!!! \n' + exception);
    }
  }

  /*
  public create(chain: Chain): Observable<Chain> {
    return this.http.post<Chain>(this.URL_BDDS, chain, this.httpOptions);
  }
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



  public update(chain: TChaines): Observable<TChaines> {
    try {
      return this.http.put<TChaines>(this.URL_BDDS2, chain, this.httpOptions);
    } catch (exception) {
      console.log('Message d erreur chainService 117!!! \n' + exception);
    }
  }



  public delete(chain: TChaines): Observable<TChaines> {
    try {
      return this.http.delete<TChaines>(this.URL_BDDS + '/' + chain);
    } catch (exception) {
      console.log('Message d erreur chainService 127!!! \n' + exception);  }
    return this.http.delete<TChaines>(this.URL_BDDS + '/' + chain);
  }


}
