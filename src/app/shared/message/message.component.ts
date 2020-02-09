import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public message: any;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.messageService.getMessage()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'app-message message-success';
            break;
          case 'error':
            message.cssClass = 'app-message message-danger';
            break;
        }
        this.message = message;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
