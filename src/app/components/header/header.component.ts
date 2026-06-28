import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { companyName } from '../../config';

interface ILink {
  path: string;
  text: string;
}
@Component({
  selector: 'header-block',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  company_name = companyName;
  links: ILink[] = [
    { path: '', text: 'Главная' },
    { path: 'users', text: 'Пользователи' },
  ];
}
