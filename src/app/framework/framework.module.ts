import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputWrapComponent } from './input-wrap/input-wrap.component';
import { MatMenuModule } from '@angular/material/menu';
import { BlockTextAreaComponent } from './block-text-area/block-text-area.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  
    BlockTextAreaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    InputWrapComponent
  ],
  exports: [
    BlockTextAreaComponent
  ]
})
export class FrameworkModule { }
