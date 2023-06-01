import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { authGuard } from './guards/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { accessResolver } from './resolvers/access.resolver';
import { EMPTY } from 'rxjs';

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: '', children: [
    {
      path: 'auth/page',
      component: AuthPageComponent,
      // canActivate: [authGuard]
    },
    { path: 'second-module', loadChildren: () => import('./second-module/second-module.module').then(m => m.SecondModuleModule) },
  ]},
  { path: 'third-module', loadChildren: () => import('./third/third.module').then(m => m.ThirdModule) },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
