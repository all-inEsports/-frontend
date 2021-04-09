import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { BettingService } from '../betting.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Bet } from '../Bet'
import { Transaction } from '../Transaction'
import { AuthenticationService } from '../authentication.service';
import { TransactionService } from '../transaction.service';
import { UserDataService } from '../user-data.service';
import { element } from 'protractor';

@Component({
  selector: 'app-matchpage',
  templateUrl: './matchpage.component.html',
  styleUrls: ['./matchpage.component.css']
})
export class MatchpageComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  Game!: any;
  querySub:any;
  teamChoice!: string;
  bettingAmount!: Number;
  currentBet = new Bet;
  totalBetTeam1= 0;
  totalBetTeam2= 0;
  totalBet:number = 0;
  totalBetTeam1Percentage:number = 0;
  totalBetTeam2Percentage:number = 0;
  token!: any;
  activeBets!: any;
  alreadyBet!: boolean;
  currentDate = new Date();
  constructor(private service:GameDataService,private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute, private router: Router,private betService:BettingService, private auth: AuthenticationService, private transactionService:TransactionService, private userService:UserDataService ) {
             
              }

  ngOnInit(): void {
    this.token = this.auth.readToken();
    this.querySub = this.route.params.subscribe(params=>{
      this.service.getGameById(params['id']).subscribe(data=>{
        this.Game = data;
        console.log(this.Game)
        this.betService.getUserBetsInProgress(this.token.UserName).subscribe(data=>{
          this.activeBets = data;
          this.alreadyBet = false;
          this.activeBets.forEach((element:any) => {
            if(element.MatchId==this.Game._id){
              this.alreadyBet=true;
              this.currentBet=element
            }
          });
        })
        this.userService.getAllUsers().subscribe(data=>{
          data.forEach((element:any)=>{
            this.betService.getUserBetsInProgress(element.UserName).subscribe(userBets=>{
              userBets.forEach((element:any)=>{
                if(element.TeamId==this.Game.opponents[0].opponent.id){
                  this.totalBetTeam1+=element.Amount
                  this.totalBet+=element.Amount
                }else if(element.TeamId==this.Game.opponents[1].opponent.id){
                  this.totalBetTeam2+=element.Amount
                  this.totalBet+=element.Amount
                }
              })
              if(this.totalBet!=0){
                this.totalBetTeam1Percentage=parseInt((this.totalBetTeam1/this.totalBet*100).toFixed(2));
                this.totalBetTeam2Percentage=parseInt((this.totalBetTeam2/this.totalBet*100).toFixed(2));
              }else{
                this.totalBetTeam1Percentage=0;
                this.totalBetTeam2Percentage=0;
              }
            })
          })
        })
      });
    })
  }
  onSubmit(): void{
    if(this.alreadyBet!=true){
      this.currentBet.UserName = this.token.UserName
      this.currentBet.MatchId = this.Game._id
      if(this.teamChoice==this.Game.opponents[0]?.opponent?.name){
        this.currentBet.TeamId = this.Game.opponents[0]?.opponent?.id
      }else{
        this.currentBet.TeamId = this.Game.opponents[1]?.opponent?.id
      }
      this.currentBet.Amount=this.bettingAmount;
      this.currentBet.IsWin = false;
      this.currentBet.IsInProgress = true;
      this.betService.newUserBet(this.currentBet).subscribe( async ()=>{
        this.transactionService.addNewTransaction(new Transaction(this.token.UserName,this.bettingAmount,'DEBT',`Betting ${this.bettingAmount} on ${this.Game.slug[0]}`)).subscribe();
       let value = await this.transactionService.calculateBalance(this.token.UserName)
          this.userService.updateBalance(value,this.token._id).subscribe((obj)=>{
          if(obj.token){
            console.log(obj.token)
          localStorage.setItem('access_token', obj.token);
          this.router.navigate(['']);
          }
        })
      });
      this.alreadyBet=true;
    }
  }
} 
