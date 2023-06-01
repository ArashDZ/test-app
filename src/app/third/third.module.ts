import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs'
import { ThirdRoutingModule } from './third-routing.module';
import { ThirdComponent } from './third.component';
import { SecondService } from '../services/second/second.service';
import { AbstractLogService } from '../services/second/abstract-log.service';
import { ThirdLogService } from './services/third-log.service';


@NgModule({
  declarations: [
    ThirdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    ThirdRoutingModule
  ],
  providers: [
    SecondService,
    {provide: AbstractLogService, useClass: ThirdLogService}
  ]
})
export class ThirdModule { }
