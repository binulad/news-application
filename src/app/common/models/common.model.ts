import { Observable } from 'rxjs';

export interface IDeactivateComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
