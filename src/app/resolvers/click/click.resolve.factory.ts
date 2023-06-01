import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { PermServiceService } from "src/app/services/perm-service/perm-service.service";

export function clickGuard (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data['value'])
    inject(PermServiceService).clicked = route.data['value'];
    return true;
};