import { inject, Service } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { LocalStoreService } from '../localStor/local-store.service';
@Service()
export class ThemeService {
  localStorageService: LocalStoreService = inject(LocalStoreService);
  private localStorageKey = 'theme';
  private themeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.localStorageService.get(this.localStorageKey) || 'Aura',
  );
  theme$ = this.themeSubject.asObservable();

  setTheme(theme: string): void {
    this.localStorageService.set(this.localStorageKey, theme);
    this.themeSubject.next(theme);
  }

  getTheme(): string {
    return this.themeSubject.value;
  }
}
