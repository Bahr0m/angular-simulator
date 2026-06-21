import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessageService } from '../../sevices/message/message.service';

@Component({
  selector: 'message',
  imports: [NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  messageService: MessageService = inject(MessageService);
}
