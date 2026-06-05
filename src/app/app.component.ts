import { Component } from '@angular/core';
import { Colors } from '../enums/Color';
import './collection';
import { FormControl } from '@angular/forms';

interface Offer {
  title: string;
  description: string;
  icon_src: string;
}

interface Option<T> {
  label: string;
  value: T;
}
@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  company_name = 'РУМТИБЕТ';
  offers: Offer[] = [
    {
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon_src: '/image/guide.png',
    },
    {
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon_src: '/image/shield.png',
    },
    {
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon_src: '/image/loyal.png',
    },
  ];

  locations: Option<string>[] = [
    { label: 'Алтай', value: 'altai' },
    { label: 'Кавказ', value: 'caucasus' },
    { label: 'Камчатка', value: 'kamchatka' },
    { label: 'Байкал', value: 'baikal' },
  ];

  participants: Option<number>[] = [
    { label: '1 человек', value: 1 },
    { label: '2 человека', value: 2 },
    { label: '3–5 человек', value: 5 },
    { label: '6+ человек', value: 6 },
  ];

  selectedLocation: string = '';
  selectedParticipants: number = 1;
  selectedDate: string = '';

  //2
  isMainColor(color: string): boolean {
    return color === Colors.Red || color === Colors.Green || color === Colors.Blue;
  }

  //3
  lastTime() {
    let now: string = new Date().toLocaleDateString();
    localStorage.setItem('lastDate', now);
  }

  //4
  setTime() {
    let time: number = +(localStorage.getItem('time') || 0);
    localStorage.setItem('time', (++time).toString());
  }

  constructor() {
    this.lastTime();
    this.setTime();
  }
}
