import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from './Match';
import { Bet } from './Bet';
import { Notification } from './Notification'
import { BETTING_API } from './api.constants';
@Injectable({
  providedIn: 'root'
})
export class BettingService {

  constructor(private http: HttpClient) { }

  getUserBetsInProgress(userName:string):Observable<Bet[]>{
    return this.http.get<any[]>(`${BETTING_API}/v1/user/bets/${userName}?InProgress=true`);
  }  
  newUserBet(bet:Bet):Observable<any>{
    return this.http.post<any>(`${BETTING_API}/v1/bet`, bet);
  }

  resolve(bet:Bet):Observable<any>{
    return this.http.put<any>(`${BETTING_API}/v1/bet/resolve/${bet._id}`,bet);
  }

  getAllUserNotification(userName:string):Observable<Notification[]>{
    return this.http.get<any[]>(`${BETTING_API}/v1/notifications/${userName}`)
  }

  resolveNotification(notify:Notification):Observable<any>{
    return this.http.put<any>(`${BETTING_API}/v1/resolve/notification/${notify._id}`,notify);
  }
}
