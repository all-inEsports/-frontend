import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { BettingService } from '../betting.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Bet } from '../Bet'
import { AuthenticationService } from '../authentication.service';

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
  token!: any;
  activeBets!: any;
  alreadyBet!: boolean;
  constructor(private service:GameDataService,private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute, private betService:BettingService, private auth: AuthenticationService ) {
  }

  ngOnInit(): void {
    this.token = this.auth.readToken();
    this.querySub = this.route.params.subscribe(params=>{
      this.service.getGameById(params['id']).subscribe(data=>{
        this.Game = data;
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
      this.betService.newUserBet(this.currentBet).subscribe();
    }
  }
}
