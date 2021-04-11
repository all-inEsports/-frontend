import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fromEventPattern, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../user.model'
import { UserDataService } from '../user-data.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  url = "https://dxpjqktjzz8fz.cloudfront.net/"
  searchText!: string;
  userRankings;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  users: Array<User>;
  constructor(private service:UserDataService,private breakpointObserver: BreakpointObserver) {
    this.users = [];
    this.userRankings = new Map();
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(users_ =>{
      this.users = users_
      this.users.forEach((element,i)=>{
        this.userRankings.set(element,i)
      })
    });
  }

  changeSource(event: any){
    event.target.src = "assets/defProfPic.png"
  }

}
