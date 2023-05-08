import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { authGuard } from './guards/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { accessResolver } from './resolvers/access.resolver';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: '', canActivateChild: [authGuard], children: [
    {
      path: 'auth/page',
      component: AuthPageComponent,
      // canActivate: [authGuard]
    },
    { path: 'second-module', loadChildren: () => import('./second-module/second-module.module').then(m => m.SecondModuleModule) },
    {path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
