import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalHostDirective } from './directives/modal-host.directive';
import { FocusDirective } from './directives/focus.directive';
import { TextTruncatePipe } from './pipes/text-truncate.pipe';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
    ModalComponent,
    ModalHostDirective,
    FocusDirective,
    TextTruncatePipe,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    ConfirmationModalComponent,
    ModalComponent,
    ModalHostDirective,
    FocusDirective,
    TextTruncatePipe,
    DropdownDirective,
  ],
})
export class SharedModule {}
