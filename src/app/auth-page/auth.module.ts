import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartInputComponent } from './smart-input/smart-input.component';
import { AuthPageComponent } from './auth-page.component';
import { MatFormFieldModule,  } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SmartInputComponent,
    AuthPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
  ],
})
export class AuthModule { }
