import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
const API_URI='https://allinsserservice.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]> {
    const perPage = '' + Number.MAX_SAFE_INTEGER;
    return this.http.get<User[]>(`${API_URI}/v1/users?page=1&perPage=${perPage}`);
  }

  getUserById(userId : string):Observable<User>{
    return this.http.get<User>(`${API_URI}/v1/users/${userId}`);
  }

  register(newUser: User):Observable<any>{
    return this.http.post<any>(`${API_URI}/v1/user`, newUser);
  }

  update(user:User):Observable<any>{
    return this.http.put<any>(`${API_URI}/v1/users/${user._id}`,user);
  }


}
