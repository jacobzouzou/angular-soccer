import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppStandings} from './app.standings';
import {AppScoring} from './app.scoring';
import { AppAdmin } from './app.admin';
import { FormsModule} from '@angular/forms';

import { AppPageNotFound } from './app.pageNotFound';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { WebService } from './services/webService';

@NgModule({
  declarations: [
    AppComponent,
    AppStandings,
    AppAdmin,
    AppScoring,
    AppPageNotFound
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
