import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from './Match';
import { GAME_API } from './api.constants';
import { games }from './games.constants';

const perPage = Number.MAX_SAFE_INTEGER.toString();


@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient) { }

  getGames():Observable<any[]>{
    return this.http.get<any[]>(`https://gamedataservice.herokuapp.com/ps/games?page=1&perPage=10`);
  }
  getGameById(id:string):Observable<Match>{
    return this.http.get<Match>(`https://gamedataservice.herokuapp.com/ps/games/${id}`);
  }
  getAllGames():Observable<any[]>{
    return this.http.get<any[]>(`${GAME_API}/ps/games?page=1&perPage=${perPage}`);
  }
  getLOLGames():Observable<any[]>{
    
    return this.http.get<any[]>(`${GAME_API}/ps/games?game=${games.LEAGUE_OF_LEGENDS}&page=1&perPage=${perPage}`);
  }
  getCSGOGames():Observable<any[]>{
    return this.http.get<any[]>(`${GAME_API}/ps/games?game=${games.CSGO}&page=1&perPage=${perPage}`);
  }
  getDOTA2Games():Observable<any[]>{
    return this.http.get<any[]>(`${GAME_API}/ps/games?game=${games.DOTA_2}&page=1&perPage=${perPage}`);
  }
}
