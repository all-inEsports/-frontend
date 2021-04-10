import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnChanges } from '@angular/core';
import { fromEventPattern, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Notification } from '../Notification'
import { BettingService } from '../betting.service';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public token: any;
  Notifications: Array<any>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
 
  constructor(private breakpointObserver: BreakpointObserver,private service: BettingService,private auth: AuthenticationService) { 
    this.Notifications = [];
  }

  ngOnInit(): void {
  }
  ngOnChanges(): void{
    this.token = this.auth.readToken();
    this.service.getAllUserNotification(this.token.UserName).subscribe(data=>{
      this.Notifications = data;
    })
    this.Notifications.filter(e => !e.IsRead).forEach(e =>{
      this.service.resolveNotification(e).subscribe()
    })
  }

}
