import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, state, AUTO_STYLE
  } from '@angular/animations';
  
export const collapseAnimation = 
  trigger('collapse', [
    state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
    state('true', style({ height: '0', visibility: 'hidden' })),
    transition('false => true', animate(100 + 'ms ease-in')),
    transition('true => false', animate(100 + 'ms ease-out'))
  ]);
  