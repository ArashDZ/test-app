import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondModuleRoutingModule } from './second-module-routing.module';
import { SecondModuleComponent } from './second-module.component';
import { SeconCompComponent } from './secon-comp/secon-comp.component';
import { SecondService } from '../services/second/second.service';
import { AbstractLogService } from '../services/second/abstract-log.service';
import { SecondLogService } from './services/second-log.service';


@NgModule({
  declarations: [
    SecondModuleComponent,
    SeconCompComponent
  ],
  imports: [
    CommonModule,
    SecondModuleRoutingModule
  ],
  providers: [
    SecondService,
    {provide: AbstractLogService, useClass: SecondLogService}
  ]
})
export class SecondModuleModule { }
