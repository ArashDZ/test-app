import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThirdComponent } from './third.component';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [{ path: '', canDeactivate: [canDeactivateGuard], component: ThirdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), MatDialogModule],
  exports: [RouterModule]
})
export class ThirdRoutingModule { }
