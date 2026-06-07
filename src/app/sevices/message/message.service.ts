import { Injectable } from '@angular/core';
import { IMessage, messageTypes } from './message.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  readonly messageTypes = messageTypes;
  messages: IMessage[] = [];

  addMessage(new_message: Omit<IMessage, 'id'>) {
    const message = {
      id: Math.floor(Math.random() * 10),
      ...new_message,
    };
    this.messages.unshift(message);
    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  closeMessage(id: number) {
    this.messages = this.messages.filter((mesg) => mesg.id != id);
  }
}
