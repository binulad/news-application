import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ConfirmationModal } from '../../models/common.model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  @Input() modalData!: ConfirmationModal;

  @Output() closeModal = new EventEmitter<boolean>();
  @Output() onClickYes = new EventEmitter<boolean>();

  @ViewChild('modalRef') modalRef!: ElementRef;

  /**
   * This Host listener listen the event inside the Modal dialog
   * @param event Event inside the modalRef element
   */
  @HostListener('click', ['$event']) clickOutSide(event: any) {
    if (!this.modalRef.nativeElement.contains(event.target)) {
      this.closedModal();
    }
  }

  /**
   * This method called to handle the event while click on Yes
   */
  handleYes() {
    this.onClickYes.emit();
  }

  /**
   * This method called to handle the event while click on No
   */
  closedModal() {
    this.closeModal.emit();
  }
}
