import { Injectable } from '@angular/core';
import { ModalHostDirective } from '../../directives/modal-host.directive';
import { Modal } from '../../models/common.model';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  /**
   * This method called to create the Dynamic Modal Component
   * @param modalHost Passed the modalHost Directive
   * @param modalData Passed the Modal Data
   */
  loadModalComponent(modalHost: ModalHostDirective, modalData: Modal) {
    const viewContainerRef = modalHost.viewContainerRef;
    viewContainerRef.clear();

    const contentRef = viewContainerRef.createComponent(ModalComponent);
    contentRef.instance.modalData = modalData;

    // This method called to Remove the Dynamic Component
    contentRef.instance.destroyModal.subscribe(() => {
      contentRef.destroy();
    });
  }
}
