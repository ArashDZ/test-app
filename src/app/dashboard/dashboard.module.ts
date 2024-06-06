import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PermServiceService } from '../services/perm-service/perm-service.service';
import { InputWrapComponent } from '../framework/input-wrap/input-wrap.component';
import { ImmmgModule } from '@test-pack/immmg';
// import { ImgComponent } from 'img';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatButtonModule,
    InputWrapComponent,
    MatSelectModule,
    ImmmgModule,
    // ImgComponent
  ],
  providers: [
    PermServiceService
  ]
})
export class DashboardModule { }
