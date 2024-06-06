import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LogLoadingInterceptor } from './interceptors/loading/loading.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LogLoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(private router: Router) {
  //   router.config.forEach(route => {
  //     if(route.loadChildren) {
  //       const children = route.loadChildren();
  //       if (children instanceof Promise){ 
  //         console.log('processing ' + route.path);
  //         children.then(child => console.log(route.path + "=>" + child))
  //       }
  //     } 
      
  //     else
  //       console.log(route);
  //   });

  //   router.config as Routes
  // }

  constructor (htc: HttpClient) {
    window.rootHtC = htc;
  }
 }

declare let window: Window & typeof globalThis & {rootHtC: HttpClient};
