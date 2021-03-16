import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user.model';
import { USER_API } from './api.constants';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from './tokens.model';
//import { config } from './../'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser!: string | null;

  constructor(private http: HttpClient) { }

  login(user: { username: string, password: string}): Observable<boolean> {
    return this.http.post<any>(`${USER_API}`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
            alert(error.error);
            return of(false);
        })
      );
  }

  private doLoginUser(username: string, tokens: Tokens){
    this.loggedUser = username;
    this.storedTokens(tokens);
  }

  private storedTokens(tokens: Tokens){
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  logout() {
    return this.http.post<any>(`${USER_API}`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(()=> this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  }

  refeshToken() {
    
  }

  private doLogoutUser(): void {
    this.loggedUser = null;
    this.removeTokens();
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
}
