import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';

import { RegisterService } from '../service/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  firstname: string;
  lastname: string;
  address: string;
  username: string;
  password: string;

  constructor(private reg: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  userSignup(){
    this.reg.registerUser(this.firstname, this.lastname, this.address, this.username, this.password)
    .subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/home'])
    });
  }
}
