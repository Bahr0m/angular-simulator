import { Component } from '@angular/core';
import { companyName } from '../../config';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTelegram, faVk, faPinterest, faSkype } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'footer-block',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  faTelegram = faTelegram;
  faVK = faVk;
  faPinterest = faPinterest;
  faSkype = faSkype;
  company_name = companyName;
  our_services: string[] = [
    'Прогулки в горы летом',
    'Зимние походы в горы',
    'Посещение храмов в горах',
    'Экстремальные виды туризма',
    'Походы в джунглях Амазонии',
    'Поездка в Африку',
  ];
  important4trip: string[] = [
    'Как собрать в долгий поход?',
    'Жизненно важные предметы для похода',
    'Медицинская страховка, гарантии безопасности',
    'Если вы врач - загляните сюда',
  ];
}
