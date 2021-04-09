import { Component, OnInit, Input, HostListener, Query} from '@angular/core';
import { GameDataService } from '../game-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
        this.service.getGamesByGenre(params['id'],"1","100").subscribe(data=>{
          this.Games = data;
        });
        this.Games=[];
      })
    }else{
    this.service.getAllGames("1","100").subscribe(games_ =>
      this.Games = games_
    );
    }
  }
  getDate(date:any){
    this.gameDate = new Date(date)
    this.dateTimeStamp = this.gameDate.getTime();
    return this.dateTimeStamp
  }
  page:number = 2;
  onScroll(event:any){
    if(this.bottomReached()){
      if(this.route.snapshot.params.id){
        this.querySub = this.route.params.subscribe(params=>{
          this.service.getGamesByGenre(params['id'],(this.page).toString(),"100").subscribe(data=>{
            this.page++
            this.Games=this.Games.concat(data)
          });
        })
      }else{
      this.service.getAllGames((this.page).toString(),"100").subscribe(games_ =>{
        this.page++
        this.Games=this.Games.concat(games_)
      });
      }
    }
  }
  scrollHeight!: any;
  scrollTop!: any;
  scrollClient!:any;
  bottomReached(): boolean {
    this.scrollHeight = document?.getElementById('match-game-box')?.scrollHeight
    this.scrollTop = document?.getElementById('match-game-box')?.scrollTop
    this.scrollClient = document?.getElementById('match-game-box')?.clientHeight
    return (this.scrollHeight - this.scrollTop) === this.scrollClient;
  }

}
