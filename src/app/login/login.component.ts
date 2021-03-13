import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule} from "@angular/forms";
import { UserDataService } from "../user-data.service";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, CanActivate {
  x: boolean = true; //temporal variable
  errorMSG: string = '';
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private data: UserDataService, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name:"",
      password:""
    });
  }

  onSubmit() {
    const formValue = this.loginForm.value;

    if(formValue.name = ""){
      this.errorMSG = "Invalid UserName.";
    }else if(formValue.password = ""){
      this.errorMSG = "Invalid Password."
    }else if(formValue.name != null && formValue.password != null){
      
      if(this.x){//temporal variable
        //looks up for username in the databse and sees if the password matches.
        //if it succeeds then redirects to home page passing over user data.
        //this.canActivate();
        this.router.navigate(['/home'])
      }else{
        this.errorMSG = "Password or Username is incorrect.";
      }
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
