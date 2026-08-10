import { Directive, HostBinding, HostListener, Input } from '@angular/core';

interface IGradientConfiguration {
  delay: number;
  colors: string[];
  thickness: number;
}

@Directive({
  selector: '[Animate]',
})
export class AnimateDirective {

  constructor() {}

  @Input() GradientConfiguration!: IGradientConfiguration = {
    delay: 1000,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    thickness: 2,
  };

  @HostBinding('style.background') background() {
    const { colors, delay } = this.GradientConfiguration;
    const gradient = `linear-gradient(90deg, ${colors.join(', ')})`;
    return `${gradient} ${delay}ms infinite`;
  }

  @HostListener('mouseenter') onMouseEnter() {
    const { colors, thickness } = this.GradientConfiguration;
    const gradient = `linear-gradient(90deg, ${colors.join(', ')})`;
    this.background = `${gradient} ${thickness}px`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    const { colors, delay } = this.GradientConfiguration;
    const gradient = `linear-gradient(90deg, ${colors.join(', ')})`;
    this.background = `${gradient} ${delay}ms infinite`;
  }
}
