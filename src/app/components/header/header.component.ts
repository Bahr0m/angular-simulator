import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CheckboxChangeEvent } from 'primeng/types/checkbox';
import { companyName } from '../../config';
import { LocalStoreService } from '../../services/localStor/local-store.service';
import { ThemeService } from '../../services/theme/theme.service';
interface ILink {
  path: string;
  text: string;
}
const enum Theme {
  Aura = 'Aura',
  Nora = 'Nora',
  Lara = 'Lara',
}
interface ITheme {
  name: Theme;
  value: Theme;
}
@Component({
  selector: 'header-block',
  imports: [
    RouterLink,
    RouterLinkActive,
    ToggleSwitchModule,
    FormsModule,
    FontAwesomeModule,
    SelectButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  localStoreService: LocalStoreService = inject(LocalStoreService);
  themeService: ThemeService = inject(ThemeService);
  private darkKey = 'dark_mode';
  company_name = companyName;
  sun = faSun;
  moon = faMoon;
  darkMode = this.localStoreService.get(this.darkKey) === 'true' ? true : false;
  links: ILink[] = [
    { path: '', text: 'Главная' },
    { path: 'users', text: 'Пользователи' },
  ];
  themes: ITheme[] = [
    { name: Theme.Nora, value: Theme.Nora },
    { name: Theme.Lara, value: Theme.Lara },
    { name: Theme.Aura, value: Theme.Aura },
  ];
  theme = this.themeService.getTheme() as Theme;

  ngOnInit(): void {
    this.checkTheme(this.theme);
    const element: HTMLHtmlElement | null = document.querySelector('html');
    if (this.darkMode) {
      element!.classList.add(this.darkKey);
    }

  }

  changeTheme(event: SelectButtonChangeEvent): void {
    this.themeService.setTheme(event.value);
    this.checkTheme(event.value);
  }

  checkTheme(theme: Theme): void {
    if (theme === Theme.Lara) {
      usePreset(Lara);
    } else if (theme === Theme.Nora) {
      usePreset(Nora);
    } else {
      usePreset(Aura);
    }
  }

  toggleMode(event: CheckboxChangeEvent): void {
    this.localStoreService.set(this.darkKey, event.checked.toString());
    const element: HTMLHtmlElement | null = document.querySelector('html');
    element!.classList.toggle(this.darkKey);
  }
}
