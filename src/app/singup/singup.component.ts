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
  ngOnInit(): void {

  }

  async onSignup(email: string, password: string, nick: string) {
    this.firebaseService.signup(email, password, nick).then((res) => {
      if (this.firebaseService.isLoggedIn) {
        console.log(res)
        // this.firebaseService.nickname = nick;
        this.isSignedIn = true
        this.route.navigate(['/messenger'])

      }
    })
  }

  submitForm() {

  }
}

