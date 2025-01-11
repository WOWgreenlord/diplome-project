import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decline',
  standalone: true,
})
export class DeclinePipe implements PipeTransform {
  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      return ''; // Возвращаем пустую строку, если значение не определено или не строка
    }

    const [quantity, ...rest] = value.split(' ');
    const baseWord = rest[0];
    const additionalText = rest.slice(1).join(' ');

    const declineWord = (quantity: number, word: string): string => {
      const absQuantity = Math.abs(quantity);
      const lastDigit = absQuantity % 10;
      const lastTwoDigits = absQuantity % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return `${word}ах`;
      } else if (lastDigit === 1) {
        return `${word}е`;
      } else if (lastDigit >= 2 && lastDigit <= 4) {
        return `${word}ах`;
      } else {
        return `${word}ах`;
      }
    };

    const declinedWord = declineWord(+quantity, baseWord);
    return `${quantity} ${declinedWord} ${additionalText}`;
  }
}
