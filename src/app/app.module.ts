import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
// ngfire imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


// component imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// service imports
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

import { SettingsService } from './services/settings.service';


const appRoutes: Routes = [
  {path:'', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'register', component:RegisterComponent, canActivate:[RegisterGuard]},
  {path:'login', component:LoginComponent},
  {path:'add-client', component:AddClientComponent, canActivate:[AuthGuard]},
  {path:'client/:id', component:ClientDetailsComponent, canActivate:[AuthGuard]},
  {path:'edit-client/:id', component:EditClientComponent, canActivate:[AuthGuard]},
  {path:'settings', component:SettingsComponent, canActivate:[AuthGuard]},
  {path:'**', component:PageNotFoundComponent}
  
  
];

export const firebaseConfig = {
    apiKey: "AIzaSyCe5mIj1Tu9Mi3rg7qExf8ozaoSxJ5ulNk",
    authDomain: "crmpanel-7489c.firebaseapp.com",
    databaseURL: "https://crmpanel-7489c.firebaseio.com",
    storageBucket: "crmpanel-7489c.appspot.com",
    messagingSenderId: "1032552197655"
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    FlashMessagesModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ClientService,
    AuthService,
    AuthGuard,
    SettingsService,
    RegisterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
