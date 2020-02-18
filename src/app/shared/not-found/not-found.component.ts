import { Component, AfterViewInit, OnInit, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  animations: [
    trigger('rotatedState', [
      transition(':enter',
        animate('2000ms ease-out',
          style({ transform: 'rotate(-360deg)' }))),
    ])
  ]
})
export class NotFoundComponent implements OnInit {
  @HostBinding('@rotatedState') state = true;
  ngOnInit(): void {
  }

}
