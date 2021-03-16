import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule} from "@angular/forms";
import { UserDataService } from "../user-data.service";
import { Router, CanActivate } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { User } from '../user.model';
import { JWT_OPTIONS } from '@auth0/angular-jwt';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, CanActivate {

  payload: User = {
    UserName: "DummyUser",
    Balance: 75000,
    ProfilePic: "Default.png",
    IsAdmin: false,
    _id: 15,
    _v: 0,
    Date: new Date(),
    Email: "dummy@test.com",
    Password: "Test123456"
  }

  token: any = (this.payload, "1Sf123GT");

  tempUser!: User;
  errorMSG: string = '';
  userName: string = "";
  password: string = "";
  constructor(private data: UserDataService, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.tempUser = new User();
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
      
      //dummy token authentication
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
      }

      /*this.authService.login(this.tempUser).subscribe(
        (success) => {
          // store the returned token in local storage as 'access_token'
          localStorage.setItem('access_token',success.token);            // redirect to the "vehicles" route
          this.router.navigate(['/home']);
        }
      );*/  
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
