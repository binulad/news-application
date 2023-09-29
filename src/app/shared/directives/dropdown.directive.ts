import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'dropdownDirective', // Use the exportAs to use dropdownDirective instance in the template
})
export class DropdownDirective {
  private wasInside: boolean = false;
  @HostBinding('class.show') isShow: boolean = false;

  constructor() {}

  /**
   * This Host listener listen the click event inside the dropdown
   */
  @HostListener('click') onClick() {
    this.isShow = !this.isShow;
    this.wasInside = true;
  }

  /**
   * This Host listener listen the click event outside the dropdown
   */
  @HostListener('document:click') clickOutSide() {
    if (!this.wasInside) {
      this.isShow = false;
    }
    this.wasInside = false;
  }
}
