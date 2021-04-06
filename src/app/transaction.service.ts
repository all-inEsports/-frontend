import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TRANSACTION_API } from './api.constants';
import { Transaction } from './Transaction'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getUserTransactions(userName: string): Observable<Transaction[]> {
    return this.http.get<any[]>(`${TRANSACTION_API}/v1/transaction/${userName}`);
  }

  addNewTransaction(data: Transaction): Observable<any> {
    return this.http.post<any>(`${TRANSACTION_API}/v1/new/transaction`, data);
  }

  calculateBalance(userName: string):Promise<Number> {
    return new Promise(resolve => {
      this.getUserTransactions(userName).subscribe((transactions) => {
        resolve(transactions.filter(transaction => transaction.Type == 'CREDIT').map(e => e.Amount ? e.Amount : 0).reduce((a, b) => a.valueOf() + b.valueOf()).valueOf() -
          transactions.filter(transaction => transaction.Type == 'DEBT').map(e => e.Amount ? e.Amount : 0).reduce((a, b) => a.valueOf() + b.valueOf()).valueOf());
      });
    })

  }


}
