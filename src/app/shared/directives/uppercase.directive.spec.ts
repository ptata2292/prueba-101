import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {
  it('should create an instance', () => {   
    let elementRef: ElementRef;
    const directive = new UppercaseDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
