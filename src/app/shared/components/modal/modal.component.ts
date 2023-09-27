import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() modalData!: any;
  @Output() destroyModal: EventEmitter<boolean> = new EventEmitter();

  closedModal() {
    this.destroyModal.emit(true);
  }
}
