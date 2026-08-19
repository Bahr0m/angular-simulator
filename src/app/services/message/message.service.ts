import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage, messageTypes } from './message.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  readonly messageTypes = messageTypes;
  private lastId = 0;
  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  message$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private addMessage(new_message: Omit<IMessage, 'id'>): void {
    const message: IMessage = {
      id: ++this.lastId,
      ...new_message,
    };
    this.messagesSubject.next([message, ...this.messagesSubject.value]);

    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messagesSubject.next(this.messagesSubject.value.filter((mesg) => mesg?.id != id));
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
