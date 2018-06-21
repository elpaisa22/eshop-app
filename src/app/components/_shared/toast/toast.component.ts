import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import {Message} from '../../../models/message/message.model';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'toast-messages',
  templateUrl: './toast.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  messages: Message[];

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.getMessages().subscribe(data => this.messages = data);
  }

}
