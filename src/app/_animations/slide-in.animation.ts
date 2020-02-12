import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
    trigger('slideInOutAnimation',
        [
            state('*', style({
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)'
            })),
            transition(':enter', [
                style({ backgroundColor: 'rgba(0, 0, 0, 0)' }),
                animate('.1s ease-in-out',
                    style({ backgroundColor: 'rgba(0, 0, 0, 0.6)' }))
            ]),
            transition(':leave', [
                animate('.1s ease-in-out',
                    style({ backgroundColor: 'rgba(0, 0, 0, 0)' }))
            ])
        ]
    );
