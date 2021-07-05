import { AfterContentInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FereserviceService } from '../fereservice.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterContentInit {

  constructor(public fireservice: FereserviceService, private db: AngularFireDatabase, private data: DatePipe) {

    this.itemsRef = db.list('messages');

    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    fireservice.getUsers().valueChanges().subscribe(users => {
      this.ulist = users
    });
    console.log(this.ulist)
    

    
  }
  @Output() isLogout = new EventEmitter<void>()

  ulist: any

  nickname = ""

  UserNameFromArrayUser = '';

  itemsRef: AngularFireList<any>;

  items: Observable<any[]>;

  message = "";

  isOwner: boolean = true;

  currentDate = ''

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


  }

  logout(key) {
    this.fireservice.logout()
    this.isLogout.emit()
    this.db.list('users').remove(key);
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
