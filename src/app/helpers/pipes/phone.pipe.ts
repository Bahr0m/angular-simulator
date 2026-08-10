import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'phone',
  standalone: true,
})
export class PhonePipe implements PipeTransform {

  transform(value: string, type: string): string {
    const phone_number = value.replace(/[()\-.\s]/g, '');
    if(type === 'compact') {
      return "+" + phone_number;
    }
    if(type === 'international') {
      return "+" + phone_number.slice(0, 1) + " " + phone_number.slice(1, 4) + " " + phone_number.slice(4, 7) + " " + phone_number.slice(7, 9) + " " + phone_number.slice(9, 11);
    }
    if(type === 'national') {
      return phone_number.slice(4, 7) + phone_number.slice(7, 9) + phone_number.slice(9, 11);
    }
    if(type === 'masked') {
      return phone_number.slice(0, 4) + "****" + phone_number.slice(8, 11);
    }
    return value;
  }
}
