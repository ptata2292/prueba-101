import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OnlyNumberDirective } from './only-number.directive';

describe('OnlyNumberDirective', () => {
  it('should create an instance', () => {
    let elementRef: ElementRef;
    const directive = new OnlyNumberDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
