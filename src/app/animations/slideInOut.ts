import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

export const slideInOutAnimation =
trigger('slideInOut', [
  transition('Page <=> Page', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ])
  ])
]);
