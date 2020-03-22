import { Injectable } from '@angular/core';
import { Chain } from './interfaceChain';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import { interfaceUser } from './interfaceUser';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'my-auth-token' }) };

@Injectable({
  providedIn: 'root'
})

export class ChainService {
  chains: Chain[] = [];
  chain: Observable<Chain[]>;

  constructor(private httpClient: HttpClient) {
    this.getChainsTestObservable();
    this.chain = this.getChainsTestObservable();
  }

  /**
   * Get ListUsers
   * @return : Liste des chains
   */
  getChainsTestObservable(): Observable<Chain[]> {
    return this.httpClient
      .get<Chain[]>('http://localhost:8080/postgresstchaine/tchaineList')
      .pipe(tap(dataList => (this.chains = dataList)));
  }

  createChainTestObservable(temporaryChain: Chain) {
    return this.httpClient
      .post<Chain>('http://localhost:8080/postgresstchaine/createtchain', temporaryChain, httpOptions);
  }


  getFilteredChainList(iudSelected) {
    let params = new HttpParams();
    params = params.append('iudSelectedForm', iudSelected);
    const options = { params: params };
    alert('chain service : ' + iudSelected);
    return this.httpClient.get('http://localhost:8080/postgressTlist/filter/'+ iudSelected);
  }




deleteChainsTestObservable(chainnomdelachaine: string): Observable<any> {
    alert('chain service : ' + chainnomdelachaine);
    return this.httpClient.delete<Chain[]>('http://localhost:8080/postgresstchaine/' + chainnomdelachaine);
  }

}
