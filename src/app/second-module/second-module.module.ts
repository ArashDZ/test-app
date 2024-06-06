import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondModuleRoutingModule } from './second-module-routing.module';
import { SecondModuleComponent } from './second-module.component';
import { SeconCompComponent } from './secon-comp/secon-comp.component';
import { SecondService } from '../services/second/second.service';
import { AbstractLogService } from '../services/second/abstract-log.service';
import { SecondLogService } from './services/second-log.service';
import { PageComponent } from './page/page.component';
import { TestListComponent } from '../framework/test-list/test-list.component';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    SecondModuleComponent,
    SeconCompComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    SecondModuleRoutingModule,
    TestListComponent,
  ],
  providers: [
    // SecondService,
    {provide: AbstractLogService, useClass: SecondLogService},
    HttpClient,
  ]
})
export class SecondModuleModule { 
  constructor (htc: HttpClient) {
    window.sModHtC = htc;
    console.log('second module activated');
    
  }
}

declare let window: Window & typeof globalThis & {sModHtC: HttpClient};
