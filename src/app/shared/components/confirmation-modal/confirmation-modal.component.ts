import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  @Input() modalData!: any;

  @Output() closeModal = new EventEmitter<boolean>();
  @Output() onClickYes = new EventEmitter<boolean>();

  handleYes() {
    this.onClickYes.emit();
  }

  closedModal() {
    this.closeModal.emit(false);
  }
}
