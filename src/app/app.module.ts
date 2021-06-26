import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';

import { FereserviceService } from './fereservice.service';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../app/homepage/home/home.module'
//import { HomeRoutingModule } from '../app/homepage/home/home-routing.module';

@NgModule({
  declarations: [
    AppComponent,

    SinginComponent,
    SingupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDZIDUGqi-8zE6RVXmIlllit3UrVIGF4KY",
      authDomain: "messanger-74f90.firebaseapp.com",
      projectId: "messanger-74f90",
      storageBucket: "messanger-74f90.appspot.com",
      messagingSenderId: "319730749708",
      appId: "1:319730749708:web:c5d56df832c69ed6e3f929",
      measurementId: "G-5P87G0HCGC"
    }),
    MatSliderModule,
    BrowserAnimationsModule,
    FormsModule,
    HomeModule,
    CommonModule
    // HomeRoutingModule

  ],
  providers: [FereserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
