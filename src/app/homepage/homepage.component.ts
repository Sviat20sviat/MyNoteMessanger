import { AfterContentInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FereserviceService } from '../fereservice.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, toArray } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { getHtmlTagDefinition } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { userInfo } from 'os';
import * as firebase from 'firebase/app';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterContentInit {

  constructor(public fireservice: FereserviceService, private db: AngularFireDatabase, private data: DatePipe) {
    this.itemsRef = db.list('messages');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    // this.nickname = this.fireservice.CurrentUserName;
    // console.log(this.nickname)

  }
  @Output() isLogout = new EventEmitter<void>()


  ngOnInit(): void {
    setTimeout(() => {
      this.UserNameFromArrayUser = JSON.parse(localStorage.getItem('user')).displayName
      console.log(this.UserNameFromArrayUser)
    }, 1000);


    this.currentDate = this.data.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')

  }

  ngAfterContentInit() {
    setTimeout(() => {
      document.getElementById('messagesblock').scrollTo(0, document.getElementById('messagesblock').scrollHeight)
    }, 2000);

    //var messageBody = document.querySelector('#messagesblock');
    // messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }



  nickname = ""

  UserNameFromArrayUser = '';

  itemsRef: AngularFireList<any>;

  items: Observable<any[]>;

  message = "";

  isOwner: boolean = true;

  currentDate = ''

  logout() {
    this.fireservice.logout()
    this.isLogout.emit()
  }


  addItem(messageText: string) {
    this.currentDate = this.data.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')
    this.itemsRef.push({ text: messageText, user: this.UserNameFromArrayUser, time: this.currentDate });
    this.message = "";
  }

  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }

  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  deleteEverything() {
    this.itemsRef.remove();
  }

}
