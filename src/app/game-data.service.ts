import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from './Match';
import { GAME_API } from './api.constants';
import { games }from './games.constants';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient) { }

  getGames():Observable<any[]>{
    return this.http.get<any[]>(`https://gamedataservice.herokuapp.com/ps/games?page=1&perPage=10`);
  }
  getGameById(id:string):Observable<any[]>{
    return this.http.get<any[]>(`https://gamedataservice.herokuapp.com/ps/games/${id}`);
  }
  getAllGames(page:string,perPage:string):Observable<any[]>{
    return this.http.get<any[]>(`${GAME_API}/ps/games?page=${page}&perPage=${perPage}&date=`+Date.now());
  }
  getGamesByGenre(id:string,page:string,perPage:string):Observable<any[]>{
    return this.http.get<any[]>(`${GAME_API}/ps/games?game=${id}&page=${page}&perPage=${perPage}&date=`+Date.now());
  }
}
