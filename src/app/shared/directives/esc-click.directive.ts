import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appEscClick]',
})
export class EscClickDirective {
  @Output() onEscPressed: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('document:keydown', ['$event'])
  onKeyDownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.onEscPressed.emit();
    }
  }
}
