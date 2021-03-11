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
  password : string = "";
  password2 : string = "";
  email : string = "";
  age : Number = 0;
  errorMSG: string = '';


  constructor(private data: UserDataService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.user.Email = this.email;
    this.user.Password = this.password;
    this.user.IsAdmin = false;
    this.data.register(this.user).subscribe(() => this.router.navigate(['/home']))
  }

}