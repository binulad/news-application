import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  handleYes() {
    this.onClickYes.emit();
  }

  closedModal() {
    this.closeModal.emit();
  }
}
