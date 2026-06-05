import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import './collection';

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
  imports: [FormsModule],
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
  selectedParticipants: number = 0;
  selectedDate: string = '';

  showTimer: boolean = true;
  timerValue: string = new Date().toLocaleTimeString();
  private timer!: number;
  count: number = 0;
  inputValue: string = '';
  isLoading: boolean = true;

  constructor() {
    setTimeout(() => {
      this.isLoading = false;
      this.timer=setInterval(() => {
        this.timerValue = new Date().toLocaleTimeString();
      }, 1000);
    }, 2000);
  }

  countUp() {
    this.count++;
  }

  countDown() {
    this.count--;
  }

  switchTimer() {
    this.showTimer = !this.showTimer;
    if (this.showTimer) {
      this.timer=setInterval(() => {
        this.timerValue = new Date().toLocaleTimeString();
      }, 1000);
    } else {
      clearInterval(this.timer);
    }
  }

  onDatepickerFocus(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.type = 'date';
  }

  onDatepickerBlur(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    if (!input.value) {
      input.type = 'text';
    }
  }

  canSearch(): boolean {
    return !!this.selectedLocation && !!this.selectedParticipants && !!this.selectedDate;
  }

  onSearch() {
    if (this.canSearch()) {
      alert(
        `Поиск программ для ${this.selectedParticipants} участников в ${this.selectedLocation} на дату ${this.selectedDate}`,
      );
    }
  }
}
