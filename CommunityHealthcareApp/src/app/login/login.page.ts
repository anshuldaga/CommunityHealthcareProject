import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from '../service/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(private loginService: LoginService, private storage: Storage,
    private router: Router) { }

  ngOnInit() {
  }

  loginPage(){
    console.log("~~~~~  in loginpage");
    this.username = "akshat@gmail.com"
    this.password = "bhardwaj"
    console.log("22 in loginpage user name:" +this.username);
    this.loginService.loginUser(this.username, this.password)
    .subscribe(res => {
      //console.log(res)
      //store token in browser DB
      this.storage.set('token', res.token);
      this.storage.set('token222', res.token)  // just to test

      // try to retrive that token 
      this.storage.length().then((length) =>{
        console.log("333 loginPage storage length:" + length  );
      }      
      )
      
      this.storage.get("token").then((result1) =>{
        console.log("4444 loginPage storage token: " + result1  );
      }      
      )
      


      // try to store token in browser localStorage
      console.log("1111  Insde loginPage -- going to store localStorage as myToken");
      localStorage.setItem('myToken', res.token);
      console.log("1111  Insde loginPage -- retrive localStorage - myToken:" + localStorage.getItem("myToken"));

      this.router.navigate(['/calendar'])
    });
  }
}
