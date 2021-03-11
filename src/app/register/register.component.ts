import { Component, OnInit } from '@angular/core';
import { User } from "../user.model";
import { FormGroup, FormBuilder} from "@angular/forms";
import { UserDataService } from "../user-data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMSG: string = '';
  pregex : RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; //one digit, one lower case, one uppercase\
  emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //email regex
  valUserName: boolean = false;
  valPassword: boolean = false;
  valEmail: boolean = false;
  valConfirmPass: boolean = false;
  alreadyExists: boolean = false;
  registUser: User = {
    UserName: "", 
    Email: "", 
    Password: "", 
    ProfilePic: "defaultPic.png", 
    Balance: 5000, 
    Date: new Date(), 
    IsAdmin: false,
    _id: 0,
    _v: 0
  }
  accountForm!: FormGroup
  constructor(private fb: FormBuilder, private data: UserDataService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.accountForm = this.fb.group({
      name: "",
      password: "",
      conPassword: "",
      email: "",
      age: false,
      term: false
    });
  }

  onSubmit(): void{
    const formValue = this.accountForm.value;
    if(formValue.password != null ){
      if(this.pregex.test(formValue.password)){
        this.valPassword = true;
      }
    }
    if(this.accountForm.get("password")?.value === this.accountForm.get("conPassword")?.value){
      this.valConfirmPass = true;
    }
    if(formValue.email != null){
      this.valEmail = true;
    }
    if(formValue.name != null && formValue.name != "" && formValue.name.length >= 3){
      this.valUserName = true;
      if(true){
        //checks if the username already exists on the database
        //
      }
    }
    if(this.valPassword && formValue.term && this.valEmail && this.valConfirmPass && formValue.age && this.valUserName){
      console.log(this.accountForm);
      console.log(formValue)
      this.registUser.UserName = formValue.name;
      this.registUser.Email = formValue.email;
      this.registUser.Password = formValue.password;
      this.registUser.Date = new Date();
      this.registUser._id = this.generateUniqueID();
      
      console.log(this.registUser);
      this.data.newUser(this.registUser).subscribe( () => this.router.navigate([``]));
    }
    else if(!formValue.term){
      this.errorMSG = "Terms not accepted."
    }
    else if(!formValue.age){
      this.errorMSG = "You must be over 13 years old to create an account."
    }
    else if(!this.valUserName){
      this.errorMSG = "Invalid Username."
    }
    else if(!this.valPassword){
      this.errorMSG = "Invalid Password."
    }
    else if(!this.valConfirmPass){
      this.errorMSG = "Doesn't match up with Password."
    }
    else if(!this.valEmail){
      this.errorMSG = "This email address already exists."
    }

  }

  generateUniqueID(): number{
    let letter = this.registUser.UserName.length;
    let ranNumb = new Date().getUTCMilliseconds();
    let num = Math.random() * Math.floor(101);
    return letter + ranNumb + num;
  }

}
