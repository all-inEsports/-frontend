import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from './user.model';
import { USER_API } from './api.constants'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]> {
    const perPage = '' + Number.MAX_SAFE_INTEGER;
    return this.http.get<User[]>(`${USER_API}/v1/users?page=1&perPage=${perPage}`);
  }

  getUserById(userId : string):Observable<User>{
    return this.http.get<User>(`${USER_API}/v1/users/${userId}`);
  }

  register(newUser: User):Observable<any>{
    return this.http.post<any>(`${USER_API}/v1/user`, newUser);
  }

  update(user:User):Observable<any>{
    return this.http.put<any>(`${USER_API}/v1/users/${user._id}`,user);
  }


}
