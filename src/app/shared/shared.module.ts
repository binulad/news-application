import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalHostDirective } from './directives/modal-host.directive';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
    ModalComponent,
    ModalHostDirective,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    ConfirmationModalComponent,
    ModalComponent,
    ModalHostDirective,
    DropdownDirective,
  ],
})
export class SharedModule {}
