import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LowercaseDirective } from './lowercase.directive';

describe('LowercaseDirective', () => {
  it('should create an instance', () => { 
    let elementRef: ElementRef;
    const directive = new LowercaseDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
