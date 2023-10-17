import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appOutsideClickListener]',
})
export class OutsideClickListenerDirective {
  @Output() outSideAction: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event']) outSideClick(event: Event): void {
    const clickInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickInside) {
      this.outSideAction.emit(event);
    }
  }
}
