import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalHostDirective } from './directives/modal-host.directive';
import { FocusDirective } from './directives/focus.directive';
import { TextTruncatePipe } from './pipes/text-truncate.pipe';
import { DropdownDirective } from './directives/dropdown.directive';
import { OutsideClickListenerDirective } from './directives/outside-click.directive';
import { EscClickDirective } from './directives/esc-click.directive';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
    ModalComponent,
    ModalHostDirective,
    FocusDirective,
    TextTruncatePipe,
    DropdownDirective,
    OutsideClickListenerDirective,
    EscClickDirective,
  ],
  imports: [CommonModule],
  exports: [
    ConfirmationModalComponent,
    ModalComponent,
    ModalHostDirective,
    FocusDirective,
    TextTruncatePipe,
    DropdownDirective,
    EscClickDirective,
  ],
})
export class SharedModule {}
