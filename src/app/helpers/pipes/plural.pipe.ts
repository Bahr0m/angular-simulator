import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number|string, ...args: string[]): string {
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    let count = Math.abs(numValue) % 100;
    let lastDigit = count % 10;
    if (lastDigit === 1 && count !== 11) {
      return args[0];
    } else if (lastDigit >= 2 && lastDigit <= 4 && (count < 10 || count > 20)) {
      return args[1];
    } else {
      return args[2];
    }
  }

}
