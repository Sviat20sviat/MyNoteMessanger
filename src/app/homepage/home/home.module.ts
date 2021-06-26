import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from '../homepage.component';
import { FormsModule } from '@angular/forms';
//import { Routes, RouterModule } from '@angular/router';

//import { BrowserModule } from '@angular/platform-browser';
//import { HttpClientModule } from '@angular/common/http';
//import { AngularFireModule } from '@angular/fire';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeRoutingModule } from './home-routing.module';
import { FereserviceService } from 'src/app/fereservice.service';
import { DatePipe } from '@angular/common';





@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // AppRoutingModule,
    //BrowserModule,
    //BrowserAnimationsModule,
    FormsModule,
    HomeRoutingModule
  ],
  providers: [
    FereserviceService,
    DatePipe
  ]

})
export class HomeModule { }
