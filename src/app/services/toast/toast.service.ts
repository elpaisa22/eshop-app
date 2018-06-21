import {Injectable} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import {Message} from '../../models/message/message.model';

@Injectable()
export class ToastService {

  private messagesSource = new BehaviorSubject<Message[]>(new Array<Message>());
  private messages : Observable<Message[]> = this.messagesSource.asObservable();

  public getMessages(): Observable<Message[]> {
    return this.messages;
  }

  public sendMessage(content, style) {
    let id : number = Math.floor(1000000 / Math.random());
    let message = new Message(content, style, id);
    this.messagesSource.getValue().push(message);
    setTimeout(() => {
      this.dismissMessage(id)
    }, 5000);
  }

  private dismissMessage(id) {
    var msg = this.messagesSource.getValue().find((i) => i.id == id);
    if (msg != null) {
       msg.dismissed = true;
       setTimeout(() => {
          var index = this.messagesSource.getValue().findIndex((i) => i.id == id);
          this.messagesSource.getValue().splice(index, 1);
       }, 300);
    }
  }

}
