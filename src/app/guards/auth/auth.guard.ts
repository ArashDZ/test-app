import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from, map } from 'rxjs';
import { PermServiceService } from 'src/app/services/perm-service/perm-service.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  let permService = inject(PermServiceService);
  let router = inject(Router);

  console.log('authGuard');
  return permService.clicked?true:router.parseUrl('');
/*
  // console.log(route, state);
  console.log(state.url);
  
  let roles = permService.getRoles();

  console.log(roles);

  if (roles.ready) {
    let result = roles.result.includes('asd')?true:router.parseUrl('/');
    console.log(result);
    return result;
  }

  if (!roles.result)
    return router.parseUrl('/');

  return from(roles.result).pipe(map((res) => {
    return res.includes('asd')?true:router.parseUrl('/');
  }))

  */
};
