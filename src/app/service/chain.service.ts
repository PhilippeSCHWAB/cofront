import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { Chain } from '../interface/interfaceChain';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ChainToUser } from '../interface/interfaceChainToUser';

//const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'my-auth-token' }) };

@Injectable({
  providedIn: 'root'
})

export class ChainService {


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private chain: Chain[] = [];

  // chain: Observable<Chain[]>;

  private URL_BDDS = 'http://localhost:8080/api/chaine';
  private URL_BDDS2 = 'http://localhost:8080/api/chaine/62';
  private URL_BDDS3 = 'http://localhost:8080/api/user';



  constructor(
    private http: HttpClient) {

  }

  public getChains(): Observable<Chain[]> {
    // If not, load timelines JSON collection
    return this.http.get<Chain[]>(this.URL_BDDS)
      // Perfom these actions when loading complete
      .pipe(
        // Save and sort the loaded datalist into the timelines array
        tap(dataList => this.chain = dataList.sort((a, b) =>
          (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))),
        // Generic error handler
        catchError(this.handleError)
      );
  }

  createChainsTestObservable(temporaryChain: Chain) {
    alert('temporarychain DC : ' + temporaryChain.datedecreation);
    alert('temporarychain DM : ' + temporaryChain.datedemodification);
    return this.http
      .post<Chain>('http://localhost:8080/api/chaine', temporaryChain, this.httpOptions);
  }

  getFilteredChainList(idSelected) {
    let params = new HttpParams();
    params = params.append('idSelectedForm', idSelected);
    const options = { params: params };
    alert('chain service : ' + idSelected);
    return this.http.get('http://localhost:8080/api/chaine/' + idSelected);
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


  public create(chain: Chain): Observable<Chain> {
    return this.http.post<Chain>(this.URL_BDDS, chain, this.httpOptions);
  }


  public update(chain: Chain): Observable<Chain> {

    //  alert('update serveurunix : '+ chain);
    return this.http.put<Chain>(this.URL_BDDS2, chain, this.httpOptions);
  }


  //###### a faire ##########
  public delete(chain: Chain): Observable<Chain> {
    alert('delete : ' + this.URL_BDDS + '/' + chain);
    return this.http.delete<Chain>(this.URL_BDDS + '/' + chain);
  }




  /*
      deleteChainsTestObservable(chainnomdelachaine: string): Observable<any> {
        alert('chain service : ' + chainnomdelachaine);
        return this.httpClient.delete<Chain[]>('http://localhost:8080/postgresstchaine/' + chainnomdelachaine);
      }
  */
}
