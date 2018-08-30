import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService : ValidateService,
    private flashMessage : FlashMessagesService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email:this.email,
      password:this.password
    }

    //Validate required fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill all the fields.. Come on!',{cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    //Validate email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please check your email... You don\'t know your email?!',{cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    //Register user
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        this.flashMessage.show('You are now registered.. Awesome.',{cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show('There was a problem, check the form and contact de adm.', {cssClass:'alert-warning',timeout:3000});
        this.router.navigate(['/register']);
      }
    });

  }
}
