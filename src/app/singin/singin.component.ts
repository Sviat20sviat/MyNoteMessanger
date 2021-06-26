import { Component, OnInit, ViewChild } from '@angular/core';
import { FereserviceService } from '../fereservice.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { logging } from 'protractor';


@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss'],

})
export class SinginComponent implements OnInit {

  constructor(public firebaseService: FereserviceService, private route: Router) { }

  @ViewChild('form') form: NgForm;

  title = 'firebase-angular-auth';
  isSignedIn = false
  ngOnInit() {
    if (localStorage.getItem('user') !== null)
      this.isSignedIn = true
    else
      this.isSignedIn = false
  }

  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password)
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true
      this.route.navigate(['messenger'])
    }

  }
  handleLogout() {
    this.isSignedIn = false
    //localStorage.setItem('nickname' login.nickname)
  }

  submitForm() {
    console.log(this.form)
    this.isSubmited = true
    this.formData = this.form.value
  }

  isSubmited = false;

  formData = {};
}
