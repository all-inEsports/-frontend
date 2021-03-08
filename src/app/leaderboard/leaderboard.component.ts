import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fromEventPattern, Observable } from 'rxjs';
import { User } from '../user.model'
import { UserDataService } from '../user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  users: Array<User>;
  constructor(private service:UserDataService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(users_ =>
      this.users = users_
    );
    
  }

}
