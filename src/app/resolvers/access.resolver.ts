import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { PermServiceService } from '../services/perm-service/perm-service.service';

export const accessResolver: ResolveFn<boolean> = (route, state) => {
  console.log(state.url);
  
  let permService = inject(PermServiceService)
  
  return permService.checkPerm(state.url);
};
