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

  async ngOnInit(){
	 this.token = this.auth.readToken();
   await  this.service.getAllUserNotification(this.token.UserName).subscribe(data=>{
      console.log(data)
      this.Notifications = data;
    })
   await this.Notifications.filter(e => !e.IsRead).forEach(e =>{
      e.IsRead = true;
      console.log(e)
      this.service.resolveNotification(e).subscribe()
    })

  }
  async ngOnChanges(){
    this.token = this.auth.readToken();
    await this.service.getAllUserNotification(this.token.UserName).subscribe(data=>{
      console.log(data)
      this.Notifications = data;
    })
    await this.Notifications.filter(e => !e.IsRead).forEach(e =>{
      e.IsRead = true;
      console.log(e)
      this.service.resolveNotification(e).subscribe()
    })
  }

}
