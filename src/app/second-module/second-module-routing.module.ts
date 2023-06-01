import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondModuleComponent } from './second-module.component';
import { SeconCompComponent } from './secon-comp/secon-comp.component';
import { authGuard } from '../guards/auth/auth.guard';
import { PermServiceService } from '../services/perm-service/perm-service.service';
import { clickGuard } from '../resolvers/click/click.resolve.factory';

const routes: Routes = [
  { path: ':id', component: SecondModuleComponent, children: [
  { path: 'comp', component: SeconCompComponent, data:{value: true}, canActivate: [clickGuard, authGuard]}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondModuleRoutingModule { }
