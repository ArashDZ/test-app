import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LogLoadingInterceptor } from './interceptors/loading/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LogLoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
