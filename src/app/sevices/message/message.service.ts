import { Injectable } from '@angular/core';
import { IMessage, messageTypes } from './message.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  readonly messageTypes = messageTypes;
  private lastId = 0;
  private messages: IMessage[] = [];

  get list(): readonly IMessage[] {
    return this.messages;
  }

  private addMessage(new_message: Omit<IMessage, 'id'>): void {
    const message = {
      id: ++this.lastId,
      ...new_message,
    };
    this.messages.unshift(message);
    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter((mesg) => mesg.id != id);
  }

  showWarn(message: string) {
    this.addMessage({ text: message, type: messageTypes.WARNING });
  }
  showError(message: string) {
    this.addMessage({ text: message, type: messageTypes.ERROR });
  }
  showSuccess(message: string) {
    this.addMessage({ text: message, type: messageTypes.SUCCESS });
  }
  showInfo(message: string) {
    this.addMessage({ text: message, type: messageTypes.INFO });
  }
}
