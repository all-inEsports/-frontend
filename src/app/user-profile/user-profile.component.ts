import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserDataService } from '../user-data.service'
import { Bet } from '../Bet'
import { Transaction } from '../Transaction'
import { BettingService } from '../betting.service';
import { GameDataService } from '../game-data.service';
import { TransactionService } from '../transaction.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public token: any;
  activeBets!: any;
  currentGames= new Array;
  constructor(private router: Router, private auth: AuthenticationService, private betService:BettingService,private service:GameDataService, private userData:UserDataService, private transactionService:TransactionService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.token = this.auth.readToken();
    this.transactionService.getUserTransactions(this.token.UserName).subscribe(data=>{
      console.log(data)
    })
    Promise.resolve(this.transactionService.calculateBalance(this.token.UserName)).then(value=>{
      console.log(value)
    })
    this.router.events.subscribe((event: Event) => {
      //if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
      //  this.token = this.auth.readToken();
      //}
    });
    this.betService.getUserBetsInProgress(this.token.UserName).subscribe(data=>{
      this.activeBets = data;
      this.activeBets.forEach((element:any) => {
        this.service.getGameById(element.MatchId).subscribe(data=>{
          this.currentGames.push(data)
        })
      });
    })
  }

  public home(){
    this.router.navigate(['/home']);
  }
  public leaderboard(){
    this.router.navigate(['/leaderboard']);
  }
  public logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }
  public async redeemFaucet(){
    this.transactionService.addNewTransaction(new Transaction(this.token.UserName,1000,'CREDIT',`Daily amount`)).subscribe();
   let value = await this.transactionService.calculateBalance(this.token.UserName);
   this.userData.updateBalance(value,this.token._id).subscribe(async (obj)=>{
      if(obj.token){
        console.log(obj.token)
      localStorage.setItem('access_token', obj.token);
      this.token = this.auth.readToken();
      }
      this.token.Balance = value;
      this.router.navigate(['/']);
    })
  
   
  }
  selectImage(event: any){
  }

}
