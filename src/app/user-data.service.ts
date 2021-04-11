import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { USER_API } from './api.constants';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
interface ImageInfo{
  title:string;
  description:string;
  link:string;
}

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getUsers():Observable<User[]> {
    const perPage = '' + 50;
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
  updateBalance(balance:Number,id:Object):Observable<any>{
    return this.http.put<any>(`${USER_API}/v1/users/${id}?Balance=${balance}`,{});
  }

  getAllUsers():Observable<User[]> {
    const perPage = Number.MAX_SAFE_INTEGER.toString();
    let params = {
      page: "1",
      perPage: perPage
    }
    return this.http.get<User[]>(`${USER_API}/v1/users?`, {params});
  }

  postImage(user: User, image: File):Observable<any>{
    var formData = new FormData()
    console.log(image)
    formData.append("filename", "" + user._id + ".png")
    formData.append("file", image)
    const headers = {'Accept': 'application/json' };
    let options = { headers: headers };
    return this.http.post<any>(`https://allin-cloudfront.herokuapp.com/api/upload`, formData);
    //return this.http.post<any>(`http://localhost:3000/api/upload`, formData, options);
  }

}
