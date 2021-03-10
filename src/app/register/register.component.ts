import { Component, OnInit } from '@angular/core';
import { User } from "../user.model";
import { FormGroup, FormBuilder} from "@angular/forms";
import { UserDataService } from "../user-data.service";

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
  constructor(private fb: FormBuilder, private data: UserDataService) { }

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
      this.data.newUser(this.registUser);
    }
    else if(!formValue.term){
      //alert box for unchecked terms
      this.errorMSG = "Terms not accepted."
      //console.log("Terms not accepted.");
    }
    else if(!formValue.age){
      //Alet box for underage
      this.errorMSG = "You must be over 13 years old to create an account."
      //console.log("You must be over 13 years old to create an account.");
    }
    else if(!this.valUserName){
      //alert box for invalid username
      this.errorMSG = "Invalid Username."
      //console.log("Invalid Username");
    }
    else if(!this.valPassword){
      //alert box for invalid Password
      this.errorMSG = "Invalid Password."
      //console.log("Invalid Password");
    }
    else if(!this.valConfirmPass){
      //alert box for invalid confirmation passowrd
      this.errorMSG = "Doesn't match up with Password."
      //console.log("Doesn't match up with Password");
    }
    else if(!this.valEmail){
      //alert box for invalid email address
      this.errorMSG = "This email address already exists."
      //console.log("This email address already exists");
    }

  }

  generateUniqueID(): number{
    let letter = this.registUser.UserName.length;
    let ranNumb = new Date().getUTCMilliseconds();
    let num = Math.random() * Math.floor(101);
    return letter + ranNumb + num;
  }

}
