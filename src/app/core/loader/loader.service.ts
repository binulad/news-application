import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  public loaderStatus = new BehaviorSubject<boolean>(false);

  /**
   * This method called to set the loader status value
   * @param status Passed the boolean value of loader status
   */
  displayLoader(status: boolean) {
    this.loaderStatus.next(status);
  }

  /**
   * This method called to get the loader status
   * @returns Boolean value of loader status
   */
  getLoaderStatus(): BehaviorSubject<boolean> {
    return this.loaderStatus;
  }
}
