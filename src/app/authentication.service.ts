import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user.model';
import { USER_API } from './api.constants';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { config } from './../'

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private http: HttpClient ) { }

  public getToken(): string | null{
    return localStorage.getItem('access_token');
  }

  public readToken(): any{
    const token: any = localStorage.getItem('access_token');
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    // Note: We can also use helper.isTokenExpired(token) 
    // to see if the token is expired

    if (token) {
      console.log(`token exists: ${token}`);
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    // Attempt to login
    return this.http.post<any>(`${USER_API}`, user);
  }

  public logout() {
    localStorage.removeItem('access_token');
  }
}
