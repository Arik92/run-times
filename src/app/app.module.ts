import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { NgxChartsModule }from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { StatFormComponent } from './stat-form/stat-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PapaParseModule } from 'ngx-papaparse';
import { ResultsComponent } from './results/results.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import {GraphsComponent} from './graphs/graphs.component';


@NgModule({
  declarations: [
    AppComponent,
    StatFormComponent,
    ResultsComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    GraphsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    PapaParseModule,
    NgxChartsModule
  ],
  exports: [
    MatRadioModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
