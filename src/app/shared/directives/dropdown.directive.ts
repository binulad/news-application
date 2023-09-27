import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropdown',
})
export class DropdownDirective {
  private wasInside: boolean = false;
  @HostBinding('class.show') isShow: boolean = false;

  constructor() {}

  @HostListener('click') onClick() {
    this.isShow = !this.isShow;
    this.wasInside = true;
  }

  @HostListener('document:click') clickOutSide() {
    if (!this.wasInside) {
      this.isShow = false;
    }
    this.wasInside = false;
  }
}
