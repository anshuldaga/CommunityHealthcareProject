import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

import { RegisterService } from '../service/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string;
  password: string;

  constructor(private reg: RegisterService) { }

  ngOnInit() {
  }

  userSignup(){
    this.reg.registerUser(this.username, this.password)
    .subscribe(res => {
      console.log(res)
    });
  }
}
