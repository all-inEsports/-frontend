import { Component, OnInit, Input } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-gamespage',
  templateUrl: './gamespage.component.html',
  styleUrls: ['./gamespage.component.css']
})
export class GamespageComponent implements OnInit {
  @Input() User!: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  Games: Array<any>;
  querySub:any;
  constructor(private service:GameDataService,private breakpointObserver: BreakpointObserver,private route: ActivatedRoute) {
    this.Games = [];
  }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params=>{
      this.service.getGamesByGenre(params['id']).subscribe(data=>{
        this.Games = data;
      });
    })
  }
}
