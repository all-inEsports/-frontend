import { Component, OnInit, Input } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  @Input() User!: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  Games: Array<any>;
  constructor(private service:GameDataService,private breakpointObserver: BreakpointObserver) {
    this.Games = [];
  }

  ngOnInit(): void {
    this.service.getAllGames().subscribe(games_ =>
      this.Games = games_
    );
    
  }
}
