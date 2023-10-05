import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
class UserToken {}

@Injectable()
class PermissionService {
  canActivate(currentUser: UserToken): boolean {
    return true;
  }

  canMatch(currentUser: UserToken): boolean {
    return true;
  }
}

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PermissionService).canActivate(inject(UserToken));
};
