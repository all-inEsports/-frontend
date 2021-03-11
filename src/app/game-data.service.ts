import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient) { }
  getGames():Observable<any[]>{
    return this.http.get<any[]>(`https://gamedataservice.herokuapp.com/ps/games?page=1&perPage=10`);
  }
}
