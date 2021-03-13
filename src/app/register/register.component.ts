import { Component, OnInit } from '@angular/core';
import { User } from "../user.model";
import { Router } from '@angular/router';
import { UserDataService } from "../user-data.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  userName: string = "";
  password : string = "";
  password2 : string = "";
  email : string = "";
  age : boolean = false;
  errorMSG: string = '';
  termsAndConditions: boolean = false;


  constructor(private data: UserDataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.termsAndConditions == true && this.age == true){
      this.user.UserName = this.userName;
      this.user.Email = this.email;
      this.user.Password = this.password;
      this.user.IsAdmin = false;
      this.user.Date = new Date();
      this.user.ProfilePic = "default.png";
      this.user.Balance = 5000;
      this.data.register(this.user).subscribe(() => this.router.navigate(['']))
    }else if(this.termsAndConditions == false){
      this.errorMSG = "Accept the Terms and Conditions to create account."
    }else if(this.age == false){
      this.errorMSG = "You must be 13 years old or older to create an account."
    }
    
  }

}