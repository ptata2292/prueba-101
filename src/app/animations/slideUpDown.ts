import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state, stagger
} from '@angular/animations';

export const slideUpDownAnimation =
  trigger('slideUpDown', [
    // state('in', style({ height: '*', opacity: 0 })),
    transition(':enter', [
      style({ height: '0px', opacity: 0 }),
      group([
        animate('200ms ease-in', style({ height: '*' })),
        animate('100ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    transition(':leave', [
      style({ height: '*', opacity: 1 }),
      group([
        animate('200ms ease-out', style({ height: '0px' })),
        animate('100ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]);
