import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserDataService } from '../user-data.service';
import { Bet } from '../Bet';
import { User } from '../user.model';
import { Transaction } from '../Transaction';
import { BettingService } from '../betting.service';
import { GameDataService } from '../game-data.service';
import { TransactionService } from '../transaction.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  url = ""
  tempUsr: User = {
    UserName: "",
    Balance: 0,
    Password: "",
    ProfilePic: "",
    _id: "",
    _v: 0,
    Email: "",
    IsAdmin: false,
    Date: new Date
  };
  public token: any;
  activeBets!: any;
  currentGames= new Array;
  Balance!: any;
  constructor(private router: Router, private auth: AuthenticationService, private betService:BettingService,private service:GameDataService, private userData:UserDataService, private transactionService:TransactionService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  async ngOnInit(){
    this.token = this.auth.readToken();
    this.url = "https://dxpjqktjzz8fz.cloudfront.net/" + this.token._id + ".png"
    console.log(this.url)
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
  public logout(){
    //this.url = "";
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
    let tmpfile: File;
    //this.token = this.auth.readToken();
    console.log("Token._id: " + this.token._id)
    this.userData.getUserById(this.token._id).subscribe((user)=> {
      this.tempUsr.Balance = user.Balance;
      this.tempUsr.Date = user.Date;
      this.tempUsr.Email = user.Email;
      this.tempUsr.Password = user.Password;
      this.tempUsr.UserName = user.UserName;
      this.tempUsr._id = user._id;
      console.log("Temp user ID: " + this.tempUsr._id + " User_id: " + user._id)
      this.tempUsr._v = user._v;
      //this.tempUsr.ProfilePic = tmpurl;

      if(event.target.files){
        console.log(event.target.files)
        //var reader = new FileReader()
        this.userData.postImage(this.tempUsr, event.target.files[0]).subscribe(()=>{
          this.token.ProfilePic = `https://dxpjqktjzz8fz.cloudfront.net/${this.tempUsr._id}.png`;
          this.url = this.token.ProfilePic;
          window.location.reload();
        });
        /*reader.readAsDataURL(event.target.files[0])
        reader.onload = (event: any) => {
          tmpfile = event.target.result;  
          
    
        }*/
      }
      //window.location.reload();
      
    });
  }

  updateDefault(event: any){
    this.url = "assets/defProfPic.png";
  }
}
