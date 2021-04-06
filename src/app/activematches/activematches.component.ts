import { Component, OnInit, Input} from '@angular/core';
import { GameDataService } from '../game-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-activematches',
  templateUrl: './activematches.component.html',
  styleUrls: ['./activematches.component.css']
})
export class ActivematchesComponent implements OnInit{
  @Input() User!: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  Games: Array<any>;
  querySub:any;
  currentDate = new Date();
  gameDate = new Date();
  dateTimeStamp!: Number;
  searchText!: string;

  constructor(private service:GameDataService,private breakpointObserver: BreakpointObserver,private route: ActivatedRoute,private router: Router) {
    this.Games = [];
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if(this.route.snapshot.params.id){
      this.querySub = this.route.params.subscribe(params=>{
        this.service.getGamesByGenre(params['id']).subscribe(data=>{
          this.Games = data;
        });
        this.Games=[];
      })
    }else{
    this.service.getAllGames().subscribe(games_ =>
      this.Games = games_
    );
    }
  }
  getDate(date:any){
    this.gameDate = new Date(date)
    this.dateTimeStamp = this.gameDate.getTime();
    return this.dateTimeStamp
  }
}
