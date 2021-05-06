import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QueryComponent } from './query/query.component';
import { TasksRendererComponent } from './tasks-renderer/tasks-renderer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, QueryComponent, TasksRendererComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
