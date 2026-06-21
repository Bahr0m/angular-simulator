import { Component } from '@angular/core';
import { companyName } from '../../config';

@Component({
  selector: 'footer-block',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
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
