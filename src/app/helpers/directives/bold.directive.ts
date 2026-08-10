import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[textBold]',
})
export class BoldDirective {

  constructor() { }

  @HostBinding('style.fontWeight') fontWeight: string = 'normal';

  @HostListener('mouseenter') onMouseEnter() {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.fontWeight = 'normal';
  }

}
