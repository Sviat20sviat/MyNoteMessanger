import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FereserviceService {
  private user: Observable<firebase.default.User>;
  private authState: any;
  constructor(
    public firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
    // this.CurrentUserName = localStorage.getItem('nickname')
  }

  isLoggedIn = false;

  ref = firebase.default.database().ref('users/');

  async signup(email: string, password: string, nick: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        //let userName = res.user;
        //console.log(res)
        res.user.updateProfile({ displayName: nick }).then(() => {
          this.isLoggedIn = true
          localStorage.setItem('user', JSON.stringify(res.user))
          // this.ref.orderByChild('nickname').equalTo(nick).once('value', snapshot => {

          //   if (snapshot.exists()) {
          //     localStorage.setItem('nickname', nick);
          //     this.router.navigate(['/roomlist']);
          //   } else {
          //     const newUser = firebase.default.database().ref('users/').push();
          //     newUser.set(nick);
          //     localStorage.setItem('nickname', nick);
          //     this.router.navigate(['/messenger']);
          //   }

          // });
        })
      }
      )

    //this.UserName = nick;
  }

  // UserName: any;

  // CurrentUserName = "";

  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        // this.UserName = firebase.default.auth().currentUser.displayName; console.log(this.UserName)
        this.isLoggedIn = true
      })

  }

  logout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

  // nickname: any;
}
