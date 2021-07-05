import { Component, OnInit, ViewChild } from '@angular/core';
import { FereserviceService } from '../fereservice.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],

})
export class SingupComponent implements OnInit {

  constructor(public firebaseService: FereserviceService, private route: Router) { }

  isSignedIn = true

  errorMsg: string;

  ngOnInit(): void {

  }

  async onSignup(email: string, password: string, nick: string, pswrepeat: string) {
    this.firebaseService.signup(email, password, nick).then((res) => {
      if (this.firebaseService.isLoggedIn ) {
        console.log(res)
        // this.firebaseService.nickname = nick;
        this.isSignedIn = true
        
      }
      
      setTimeout(() => {this.firebaseService.setUserOnline() }, 1000);
      this.route.navigate(['messenger']);

    }).catch(error => this.errorMsg = error.message)
  }

  submitForm() {

  }
}

