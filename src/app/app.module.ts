import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QueryComponent } from './query/query.component';
import { TaskListRendererComponent } from './task-list-renderer/task-list-renderer.component';

@NgModule({
  declarations: [AppComponent, QueryComponent, TaskListRendererComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
