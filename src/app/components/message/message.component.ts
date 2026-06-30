import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../../sevices/message/message.service';
import { IMessage } from '../../sevices/message/message.type';

@Component({
  selector: 'message',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  messageService: MessageService = inject(MessageService);
  message$: Observable<IMessage[]> = this.messageService.message$;
}
