import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ transform: 'translateY(10%)' }),
        animate(100),
      ]),
      transition(':leave', [
        animate(100, style({ transform: 'translateY(10%)' })),
      ]),
    ]),
  ],
})
export class DropdownComponent {
  @Input() toggleButton!: string;
  @Input() btnClass!: string;
  @Input() direction!: string;
  @Input() menuAtEnd!: boolean;
  @ContentChild('dropdownToggle') dropdownToggle!: TemplateRef<any>;
  @ContentChild('dropdownMenu') dropdownMenu!: TemplateRef<any>;
}
