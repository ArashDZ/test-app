import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondModuleComponent } from './second-module.component';
import { SeconCompComponent } from './secon-comp/secon-comp.component';

const routes: Routes = [
  { path: '', component: SecondModuleComponent },
  { path: 'comp', component: SeconCompComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondModuleRoutingModule { }
