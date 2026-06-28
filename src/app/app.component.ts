import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import './collection';
import { LocalStoreService } from './sevices/localStor/local-store.service';
import { MessageService } from './sevices/message/message.service';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MessageComponent } from "./components/message/message.component";

@Component({
  selector: 'app-root',
  imports: [NgTemplateOutlet, RouterOutlet, HeaderComponent, FooterComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  localStorage: LocalStoreService = inject(LocalStoreService);

  constructor() {
    this.lastTime();
    this.setTime();
  }

  lastTime() {
    let now: string = new Date().toLocaleDateString();
    this.localStorage.set('lastDate', now);
  }

  //4
  setTime() {
    let time: number = +(this.localStorage.get('time') || 0);
    this.localStorage.set('time', (++time).toString());
  }
}
