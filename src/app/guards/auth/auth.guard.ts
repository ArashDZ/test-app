import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs';
import { PermServiceService } from 'src/app/services/perm-service/perm-service.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  let permService = inject(PermServiceService);
  let router = inject(Router);

  // console.log(route, state);
  console.log(state.url);
  
  let roles = permService.getRoles();

  console.log(roles);

  if (roles.ready) {
    let result = roles.result.includes('asd')?true:router.parseUrl('/');
    console.log(result);
    return result;
  }
    

  return roles.result.pipe(map ( (res) => {
    console.log("in map", res);
    
    if (res.includes('assd'))
      return true;

    return router.parseUrl('/');
  }))
};
