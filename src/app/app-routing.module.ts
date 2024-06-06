import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PreloadService } from './services/preload.service';
import { SecondService } from './services/second/second.service';
import { AbstractLogService } from './services/second/abstract-log.service';
import { authGuard } from './guards/auth/auth.guard';
import { SeconCompComponent } from './second-module/secon-comp/secon-comp.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), pathMatch: 'full'},
  {path: '', children: [
    {
      path: 'auth',
      loadChildren: () => import('./auth-page/auth.module').then(m => m.AuthModule),
      // canActivate: [authGuard]
    },
  ]},
  { path: 'second-module', loadChildren: () => import('./second-module/second-module.module').then(m => m.SecondModuleModule), canActivate: [authGuard], resolve: {} },
  { path: 'third-module', loadChildren: () => import('./third/third.module').then(m => m.ThirdModule), data: {preload: true}, canActivate: [authGuard], canActivateChild: [authGuard] },
  { path: 'third-module', loadChildren: () => import('./third/third.module').then(m => m.ThirdModule), data: {preload: true}, canActivateChild: [authGuard] , outlet: 'popup' },
  // { path: 'third-module/comp', component: SeconCompComponent, data:{value: true}, outlet: 'popup'},
  { path: 'comp', component: SeconCompComponent, data:{value: true}},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    // useHash: true,
    // preloadingStrategy: PreloadAllModules,
})],
  exports: [RouterModule],
  // providers: [{provide: AbstractLogService, useValue: {}}, SecondService]
})
export class AppRoutingModule { }
