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
<<<<<<< HEAD
    const perPage = '' + Number.MAX_SAFE_INTEGER;
    return this.http.get<User[]>(`${API_URI}/v1/users?page=1&perPage=${perPage}`);
  }

  getUserById(userId : string):Observable<User>{
    return this.http.get<User>(`${API_URI}/v1/users/${userId}`);
=======

    let params = {
      page: "1",
      perPage: "50"
    }

    return this.http.get<User[]>(`https://allinsserservice.herokuapp.com/v1/users?`, {params});
>>>>>>> 1e6c341ac1537814f24ad14f42d2afd1d3e1fe9f
  }

  register(newUser: User):Observable<any>{
    return this.http.post<any>(`${API_URI}/v1/user`, newUser);
  }

<<<<<<< HEAD
  update(user:User):Observable<any>{
    return this.http.put<any>(`${API_URI}/v1/users/${user._id}`,user);
  }


=======
  getAllUsers():Observable<User[]> {
    const perPage = Number.MAX_SAFE_INTEGER.toString();

    let params = {
      page: "1",
      perPage: perPage
    }

    return this.http.get<User[]>(`https://allinsserservice.herokuapp.com/v1/users?`, {params});
  }
>>>>>>> 1e6c341ac1537814f24ad14f42d2afd1d3e1fe9f
}
