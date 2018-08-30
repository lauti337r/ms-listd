import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private  authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        //console.log(data);
        this.authService.storeUserData(data.token,data.user);
        this.flashMessage.show('Login successful! Enjoy...',{cssClass: 'alert-success',timeout:3000});
        this.router.navigate(['/dashboard']);
      }else{
        this.flashMessage.show('There was a problem... Check or contact adm quick!',{cssClass: 'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
      }
    })

  }

}
