import { ElementRef } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

describe('TooltipDirective', () => {
  it('should create an instance', () => {
    let elementRef: ElementRef;
    const directive = new TooltipDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
