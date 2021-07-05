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
      
    
  }

  usern: firebase.default.User

  isLoggedIn = false;

  ref = firebase.default.database().ref('users/');

  async signup(email: string, password: string, nick: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
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

  
  }


  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));

        this.isLoggedIn = true;
      })

  }

  logout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

 

  setUserOnline() {
    this.db.list('users').push(JSON.parse(localStorage.getItem('user')).displayName)
  }

  // uploadUser(key) {
  //   this.db.list('users').remove(key)
  // }



 getUser() {
    const userId = this.usern.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
 }


  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }
}

