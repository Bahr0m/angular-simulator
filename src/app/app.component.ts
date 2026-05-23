import { Component } from '@angular/core';
import { SelectComponent } from './common_ui/select/select.component';
@Component({
  selector: 'app-root',
  imports: [SelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  company_name = 'РУМТИБЕТ';
  selects: Omit<SelectComponent, 'isOpen' | 'toggleDropdown'>[] = [
    {
      options: [
        { label: 'Париж', value: 'paris' },
        { label: 'Токио', value: 'tokyo' },
        { label: 'Нью-Йорк', value: 'newyork' },
        { label: 'Барселона', value: 'barcelona' },
        { label: 'Амстердам', value: 'amsterdam' },
        { label: 'Рим', value: 'rome' },
      ],
      placeholder: 'Локация для тура',
      desc: 'Выберите из списка',
      type: 'select',
    },
    {
      options: [
        { label: 'Январь', value: '1' },
        { label: 'Февраль', value: '2' },
        { label: 'Март', value: '3' },
        { label: 'Апрель', value: '4' },
        { label: 'Май', value: '5' },
        { label: 'Июнь', value: '6' },
      ],
      placeholder: 'Дата похода',
      desc: 'укажите дату',
      type: 'date',
    },
    {
      options: [
        { label: 'Максим', value: '1' },
        { label: 'Анна', value: '2' },
        { label: 'Федор', value: '3' },
        { label: 'Алина', value: '4' },
        { label: 'Виктор', value: '5' },
        { label: 'Светлана', value: '6' },
      ],
      placeholder: 'Участники',
      desc: 'выберите из списка',
      type: 'select',
    },
  ];
}
