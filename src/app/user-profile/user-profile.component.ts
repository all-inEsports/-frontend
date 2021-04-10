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

  url: string | null = ""

  public token: any;
  activeBets!: any;
  currentGames= new Array;
  unreadNotifications: Number;
  Balance!: any;
  constructor(private router: Router, private auth: AuthenticationService, private betService:BettingService,private service:GameDataService, private userData:UserDataService, private transactionService:TransactionService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.unreadNotifications = 0;
   }
  ngOnChange(){
    this.betService.getAllUserNotification(this.token.UserName).subscribe(data=>{
      this.unreadNotifications = data.filter(e => !e.IsRead).length;
    })
  }
  async ngOnInit(){
    if(localStorage.getItem("Profile_Image") == null){
      localStorage.setItem("Profile_Image", "assets/defProfPic.png");
    }
    this.url = this.getprofilePic();
    this.token = this.auth.readToken();
    let value = await this.transactionService.calculateBalance(this.token.UserName);
    this.Balance = value
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
  public notifications(){
    this.router.navigate(['/notifications']);
  }
  public logout(){
    this.url = "";
    //localStorage.removeItem("Profile_Image")
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
    if(event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        if(localStorage.getItem("Profile_Image") == null){
          localStorage.setItem("Profile_Image", event.target.result);
          window.location.reload();
        }
        else {
          localStorage.removeItem("Profile_Image");
          localStorage.setItem("Profile_Image", event.target.result);
          window.location.reload();
        }
        
      }
    }
  }

  public getprofilePic(): string | null {
    return localStorage.getItem("Profile_Image");
  }

}
