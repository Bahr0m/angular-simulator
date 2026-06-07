import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  set<T, K extends string>(key: K, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get<T, K extends string>(key: K): T {
    return JSON.parse(localStorage.getItem(key) || '');
  }
  remove<T extends string>(key: T) {
    localStorage.removeItem(key);
  }
  removeAll() {
    localStorage.clear();
  }
}
