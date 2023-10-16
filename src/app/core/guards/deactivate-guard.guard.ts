import { CanDeactivateFn } from '@angular/router';
import { IDeactivateComponent } from 'src/app/common/models/common.model';

export const deactivateGuard: CanDeactivateFn<any> = (
  component: IDeactivateComponent,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
