import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fromEventPattern, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../user.model'
import { UserDataService } from '../user-data.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TransactionService } from '../transaction.service';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.component.html',
  styleUrls: ['./transactionhistory.component.css']
})
export class TransactionhistoryComponent implements OnInit {
  searchText!: string;
  public token: any;
  history!: Array<any>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  constructor(private service:UserDataService,private auth: AuthenticationService,private breakpointObserver: BreakpointObserver, private transactionService: TransactionService) {

  }

  ngOnInit(): void {
    this.token = this.auth.readToken();
    this.transactionService.getUserTransactions(this.token.UserName).subscribe(data=>{
      this.history=data;
      this.history.reverse()
    })
  }
}
