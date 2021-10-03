import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetComponent } from './widget-component/widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';


import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { appReducers } from './store/reducers/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EventEffects } from './store/effects/event.effects';
import { EventService } from './services/event.service';

import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([EventEffects]),
    MatIconModule
  ],
  providers: [
    DatePipe,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
