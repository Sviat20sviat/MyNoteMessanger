import { Component } from '@angular/core';
import *as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDZIDUGqi-8zE6RVXmIlllit3UrVIGF4KY ',
  databaseURL: 'https://messanger-74f90-default-rtdb.firebaseio.com'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'messenger';
  constructor() {
    firebase.default.initializeApp(config)
  }

}
