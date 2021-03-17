import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Match } from '../Match';

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

  constructor(private service:GameDataService,private breakpointObserver: BreakpointObserver,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params=>{
      this.service.getGameById(params['id']).subscribe(data=>{
        this.Game = data;
      });
    })
    
  }
}
