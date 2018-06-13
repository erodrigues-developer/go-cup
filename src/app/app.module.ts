import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";

import { SidebarComponent } from './sidebar/sidebar.component';
import { 
  IgxCardModule,
	IgxButtonModule,
	IgxIconModule,
	IgxLayoutModule,
	IgxNavigationDrawerModule,
	IgxRadioModule,
	IgxRippleModule,
	IgxSwitchModule,
  IgxToggleModule,
  IgxInputGroupModule
 } from "igniteui-angular/main";
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { SessionService } from './session.service';

export const firebaseConfig = {
  apiKey: "AIzaSyDDAa3h1KO4LFHX9MRCNZ8259uztT8DIgk",
  authDomain: "game-cup-pi.firebaseapp.com",
  databaseURL: "https://game-cup-pi.firebaseio.com",
  projectId: "game-cup-pi",
  storageBucket: "game-cup-pi.appspot.com",
  messagingSenderId: "468609302013"
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    IgxCardModule,
    IgxInputGroupModule,
    IgxToggleModule,
    IgxSwitchModule,
    IgxRippleModule,
    IgxRadioModule,
    IgxLayoutModule,
    IgxIconModule,
    IgxButtonModule,
    IgxNavigationDrawerModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AngularFireModule, 
    AngularFireAuth, 
    LoginService, 
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

