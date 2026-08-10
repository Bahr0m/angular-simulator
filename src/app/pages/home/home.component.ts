import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message/message.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Blog } from '../../helpers/interfaces/blogs';
import { PopularTour } from '../../helpers/interfaces/popular_tour';
import { Offer } from '../../helpers/interfaces/offer';
interface Option<T> {
  label: string;
  value: T;
}
@Component({
  selector: 'home-page',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePage {
  messageService: MessageService = inject(MessageService);
  faPlay:IconDefinition=faPlay;
  faStar:IconDefinition=faStar;
  blogs: Blog[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      content:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image_src: '/image/blogs/italy.png',
      date: '01/04/2025',
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      content:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      image_src: '/image/blogs/sky.png',
      date: '01/04/2025',
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку? ',
      content: 'Для современного мира базовый вектор развития предполагает.',
      image_src: '/image/blogs/single.png',
      date: '01/04/2025',
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      content: 'Для современного мира базовый.',
      image_src: '/image/blogs/indea.png',
      date: '01/04/2025',
    },
  ];
  popularTours: PopularTour[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      image_src: '/image/popular_tours/lake.png',
      price: 480,
      rating: 4.9,
    },
    {
      id: 2,
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      image_src: '/image/popular_tours/night_mountain.png',
      price: 580,
      rating: 4.5,
    },
    {
      id: 3,
      title: 'Растяжка в горах',
      subtitle: 'для тех, кто забоится о себе',
      image_src: '/image/popular_tours/miditation.png',
      price: 230,
      rating: 5.0,
    },
  ];
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

  addSuccessMessage() {
    this.messageService.showSuccess('Message Content');
  }
  addInfoMessage() {
    this.messageService.showInfo('Message Info');
  }
  addWarningMessage() {
    this.messageService.showWarn('Message Warning');
  }
  addErrorMessage() {
    this.messageService.showError('Message Error');
  }
}
