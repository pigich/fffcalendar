import { Component, AfterViewInit, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('rotated => default', animate('2000ms ease-out')),
      transition('default => rotated', animate('2000ms ease-out')),
    ])
  ]
})
export class NotFoundComponent implements OnInit {

  state = 'default';

  clickMe() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  ngOnInit(): void {
  }

}
