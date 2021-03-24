import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, NgForm} from "@angular/forms";
import { UserDataService } from "../user-data.service";
import { Router, CanActivate } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { User } from '../user.model';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, CanActivate {

  errorMSG: string = '';
  userName: string = "";
  password: string = "";
  constructor(private data: UserDataService, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
   // this.tempUser = new User();
  }

  onSubmit() {
    console.log(`Data inputed: ${this.userName} + ${this.password}`);
    console.log("It works.");
    if(this.userName == ""){
      this.errorMSG = "Invalid UserName.";
      console.log("Bad username.");
    }else if(this.password == ""){
      console.log("Bad password.");
      this.errorMSG = "Invalid Password."
    }
    if(this.userName != null && this.password != null){
      
     /* //dummy token authentication
      if(this.userName === this.payload.UserName){
        if(this.password === this.payload.Password){
          console.log("It logs in.")
          localStorage.setItem('access_token', this.token);
          this.router.navigate(['/home']);
        }
        else{
          console.log("Password dont match..");
        }
      }
      else{
        console.log("Username dont match..");
      }*/

      /*this.authService.login(this.tempUser).subscribe(
        (success) => {
          // store the returned token in local storage as 'access_token'
          localStorage.setItem('access_token',success.token);            // redirect to the "vehicles" route
          this.router.navigate(['/home']);
        }
      );*/  
      this.authService.login(this.userName,this.password).pipe(catchError(err => of([]))).subscribe(err =>{
        console.log("Http error: " + err);
        this.errorMSG = "Username or Password do not exist.";
      },(obj)=>{
          if(obj.token){
            console.log(obj.message);
            localStorage.setItem('access_token', obj.token);
            this.router.navigate(['/home']);
          }
      })
    }
  };

  redirectToSignUp(){
    this.router.navigate(['/register'])
  }

  canActivate() {
    if(this.authService){
      this.router.navigate(['/home']);
    }
    return !this.authService;
  }
}
