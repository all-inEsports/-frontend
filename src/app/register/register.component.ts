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

  pregex : RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; //one digit, one lower case, one uppercase\
  emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //email regex
  valUserName: boolean = false;
  valPassword: boolean = false;
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
      name: 'Enter name',
      password: 'Enter password',
      conPassword: 'Enter Password Again',
      email: 'enter email',
      term: false
    });
  }

  onSubmit(): void{
    const formValue = this.accountForm.value;
    //if(this.valPassword && formValue.term && )

    
    console.log(this.accountForm);
    console.log(formValue)
    this.registUser.UserName = formValue.name;
    this.registUser.Email = formValue.email;
    this.registUser.Password = formValue.password;
    this.registUser.Date = new Date();
    //this.registUser.Balance = 5000;
    //this.registUser.ProfilePic = "defaultPic.png";
    //this.registUser.IsAdmin = false;
    //this.registUser._v = 0;
    this.registUser._id = this.generateUniqueID();
    
    console.log(this.registUser);
    this.data.newUser(this.registUser);
  }

  generateUniqueID(): number{
    let letter = this.registUser.UserName.length;
    let ranNumb = new Date().getUTCMilliseconds();
    let num = Math.random() * Math.floor(101);
    return letter + ranNumb + num;
  }


}
