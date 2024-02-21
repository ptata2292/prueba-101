import { animation, trigger, animateChild, group, transition, animate, style, query, state, stagger } from '@angular/animations';

export const tilesAnimation = trigger('tilesAnim', [
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0 }),
            stagger(100, [animate('0.5s', style({ opacity: 1 }))])
          ], { optional: true }
        )
      ])
]);
