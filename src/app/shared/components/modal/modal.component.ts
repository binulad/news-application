import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Modal } from '../../models/common.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @Input() modalData!: Modal;
  @Output() destroyModal: EventEmitter<boolean> = new EventEmitter();

  isShow: boolean = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isShow = true;
    }, 0);
  }

  /**
   * This method called to close the Modal
   */
  closedModal() {
    this.destroyModal.emit(true);
  }
}
