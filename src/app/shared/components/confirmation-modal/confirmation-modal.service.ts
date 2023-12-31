import { Injectable } from '@angular/core';
import { ModalHostDirective } from '../../directives/modal-host.directive';
import { ConfirmationModal } from '../../models/common.model';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationModalService {
  onClickYes = new Subject<boolean>();

  constructor() {}

  /**
   * This method called to create the Dynamic Confirmation Modal Component
   * @param modalHost Passed the modalHost Directive
   * @param modalData Passed the Confirmation Modal Data
   */
  loadConfirmationComponent(
    modalHost: ModalHostDirective,
    modalData: ConfirmationModal
  ) {
    const viewContainerRef = modalHost.viewContainerRef;
    viewContainerRef.clear();

    const contentRef = viewContainerRef.createComponent(
      ConfirmationModalComponent
    );
    contentRef.instance.modalData = modalData;

    // Get the response from the component
    contentRef.instance.closeModal.subscribe(() => {
      contentRef.destroy();
    });
    contentRef.instance.onClickYes.subscribe(() => {
      this.onClickYes.next(true);
      contentRef.destroy();
    });
  }
}
