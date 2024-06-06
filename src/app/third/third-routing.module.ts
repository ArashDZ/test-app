import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThirdComponent } from './third.component';
import { canDeactivateGuard } from './guards/can-deactivate.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { authGuard } from '../guards/auth/auth.guard';
import { SeconCompComponent } from '../second-module/secon-comp/secon-comp.component';
import { OutletComponent } from './outlet/outlet.component';

const routes: Routes = [
  // { path: '', children: [
  {path: 'third-child', component: ThirdComponent, canActivate: [authGuard], canDeactivate: [canDeactivateGuard]},
  {path: '', component: OutletComponent, children: [
    { path: 'comp', component: SeconCompComponent, data:{value: true}, outlet: 'popup'},
  ]},
  { path: 'comp', component: SeconCompComponent, data:{value: true}}
  // ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MatDialogModule],
  exports: [RouterModule]
})
export class ThirdRoutingModule { }
