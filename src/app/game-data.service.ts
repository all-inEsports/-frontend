import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from './Match';
import { GAME_API } from './api.constants';
import { games }from './games.constants';

const perPage = 10;


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
  getGamesByGenre(id:string):Observable<any[]>{
    return this.http.get<any[]>(`${GAME_API}/ps/games?game=${id}&page=1&perPage=${perPage}`);
  }
}
