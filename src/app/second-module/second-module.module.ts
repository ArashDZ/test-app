import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondModuleRoutingModule } from './second-module-routing.module';
import { SecondModuleComponent } from './second-module.component';
import { SeconCompComponent } from './secon-comp/secon-comp.component';


@NgModule({
  declarations: [
    SecondModuleComponent,
    SeconCompComponent
  ],
  imports: [
    CommonModule,
    SecondModuleRoutingModule
  ]
})
export class SecondModuleModule { }
