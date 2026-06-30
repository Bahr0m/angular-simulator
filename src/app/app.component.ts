import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import './collection';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { LocalStoreService } from './sevices/localStor/local-store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MessageComponent, LoaderComponent],
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
