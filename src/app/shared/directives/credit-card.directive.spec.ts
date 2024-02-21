import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CreditCardDirective } from './credit-card.directive';

describe('CreditCardDirective', () => {
  it('should create an instance', () => {
    let elementRef: ElementRef;
    const directive = new CreditCardDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
