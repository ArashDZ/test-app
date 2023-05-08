import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs';
import { PermServiceService } from 'src/app/services/perm-service/perm-service.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // let routeString = route.url.reduce((str, url) => `${str}/${url.toString()}`,'');

  let permService = inject(PermServiceService);
  let router = inject(Router);

  // console.log(route, state);
  console.log(state.url);
  
  if (state.url.match('access=false$'))
    return true;
  return permService.checkPerm(state.url).pipe(map(x => x?true: router.parseUrl(state.url+';access=false')));
};
