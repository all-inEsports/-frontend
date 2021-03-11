import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]> {

    let params = {
      page: "1",
      perPage: "50"
    }

    return this.http.get<User[]>(`https://allinsserservice.herokuapp.com/v1/users?`, {params});
  }

  newUser(newUser: User):Observable<any>{
    return this.http.post<any>(`https://allinsserservice.herokuapp.com/v1/user`, newUser);
  }

  getAllUsers():Observable<User[]> {
    const perPage = Number.MAX_SAFE_INTEGER.toString();

    let params = {
      page: "1",
      perPage: perPage
    }

    return this.http.get<User[]>(`https://allinsserservice.herokuapp.com/v1/users?`, {params});
  }
}
