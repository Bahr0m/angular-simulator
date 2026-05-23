import { Component, Input } from '@angular/core';

export interface SelectOption {
  label: string;
  value: string;
}
type SelectType = 'select' | 'date';

@Component({
  selector: 'custom-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() options: SelectOption[] = [
    { label: 'Париж', value: 'paris' },
    { label: 'Токио', value: 'tokyo' },
    { label: 'Нью-Йорк', value: 'newyork' },
    { label: 'Барселона', value: 'barcelona' },
    { label: 'Амстердам', value: 'amsterdam' },
    { label: 'Рим', value: 'rome' },
  ];
  @Input() placeholder: string = 'Локация для тура';
  @Input() desc: string = 'Выберите из списка';
  @Input() type: SelectType = 'select';

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
