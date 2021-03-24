import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, NgForm} from "@angular/forms";
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
    UserName: "",
    Balance: 75000,
    ProfilePic: "Default.png",
    IsAdmin: false,
    _id: 15,
    _v: 0,
    Date: new Date(),
    Email: "dummy@test.com",
    Password: ""
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

  onSubmit(loginForm: NgForm) {
    if(this.payload.UserName == ""){
      this.errorMSG = "Invalid UserName.";
      console.log("Bad username.");
    }else if(this.payload.Password == ""){
      console.log("Bad password.");
      this.errorMSG = "Invalid Password."
    }
    if(this.payload.UserName != null && this.payload.Password != null){

      console.log('Payload Name: '+this.payload.UserName);
      console.log('Payload pword: '+this.payload.Password);

      this.authService.login(this.payload).subscribe(
        (success) => {
          localStorage.setItem('access_token',success.token);   
          this.router.navigate(['/home']);
        }
      ),
      (err: any)=>{
        console.log(err);
      };
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
