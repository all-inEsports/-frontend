import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule} from "@angular/forms";
import { UserDataService } from "../user-data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  x!: boolean; //temporal variable
  errorMSG: string = '';
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private data: UserDataService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name:"",
      password:""
    });
  }

  onSubmitt() {
    const formValue = this.loginForm.value;

    if(formValue.name = ""){
      this.errorMSG = "Invalid UserName.";
    }else if(formValue.password = ""){
      this.errorMSG = "Invalid Password."
    }else if(formValue.name != null && formValue.password != null){
      
      if(this.x){//temporal variable
        //looks up for username in the databse and sees if the password matches.
        //if it succeeds then redirects to home page passing over user data.
      }else{
        this.errorMSG = "Password or Username is incorrect.";
      }
    }
  };

}
