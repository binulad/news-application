import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Modal } from '../../models/common.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() modalData!: Modal;
  @Output() destroyModal: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('modalRef', { static: true }) modalRef!: ElementRef;

  /**
   * This Host listener listen the event inside the Confirmation Modal dialog
   * @param event Event inside the modalRef element
   */
  @HostListener('click', ['$event']) outSideClick(event: any) {
    if (!this.modalRef.nativeElement.contains(event.target)) {
      this.closedModal();
    }
  }

  /**
   * This method called to close the Modal
   */
  closedModal() {
    this.destroyModal.emit(true);
  }
}
