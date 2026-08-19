import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

interface IGradientConfiguration {
  delay?: number;
  colors?: string[];
  thickness?: number;
}

@Directive({
  selector: '[animatedGradient]',
})
export class AnimateDirective {
  @Input() GradientConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['yellow', 'red', 'blue'],
    thickness: 2,
  };

  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  private clearTimer(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.clearTimer();
    const delay: number | undefined = this.GradientConfiguration.delay;
    const colors: string[] | undefined = this.GradientConfiguration.colors;
    const thickness: number | undefined = this.GradientConfiguration.thickness;
    const gradient = `linear-gradient(90deg, ${colors?.join(', ')})`;

    this.timer = setTimeout(() => {
      const element = this.elementRef.nativeElement;
      this.renderer.setStyle(element, 'border', `${thickness}px solid transparent`);
      this.renderer.setStyle(element, 'border-image-source', gradient);
      this.renderer.setStyle(element, 'border-image-slice', '1');
      this.renderer.addClass(element, 'animated-gradient-border');
      this.timer = null;
    }, delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.clearTimer();
    const element = this.elementRef.nativeElement;
    this.renderer.removeStyle(element, 'border');
    this.renderer.removeStyle(element, 'border-image-source');
    this.renderer.removeStyle(element, 'border-image-slice');
    this.renderer.removeClass(element, 'animated-gradient-border');
  }
}
