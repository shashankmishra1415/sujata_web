import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]'
})
export class NumericOnlyDirective {
  @Input() decimalPlaces: number = 2;
  @Input() minValue: number = Number.MIN_SAFE_INTEGER;
  @Input() maxValue: number = Number.MAX_SAFE_INTEGER;

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const key = event.key;
    // Allow numbers, decimal point, and control characters (backspace, delete, arrow keys)
    const allowedCharacters = /[0-9.-]|[\b\t\r\n]/;
    if (!allowedCharacters.test(key)) {
      event.preventDefault();
      return;
    }

    const selectionStart = input.selectionStart??0;
    const selectionEnd = input.selectionEnd??0;

    let inputValue = input.value.substring(0, selectionStart) + input.value.substring(selectionEnd);

    // Limit decimal places
    if (key === '.' && this.decimalPlaces > 0 && inputValue.includes('.')) {
      event.preventDefault();
      return;
    }

    // Limit decimal places
    if (key === '-' && inputValue!== '') {
      event.preventDefault();
      return;
    }

    // Concatenate the new character without the selected portion
    inputValue = input.value.substring(0, selectionStart) + key + input.value.substring(selectionEnd);

  //  // Limit to minValue and maxValue
  //  const numericValue = parseFloat(inputValue);
  //  if (isNaN(numericValue) || numericValue < this.minValue || numericValue > this.maxValue) {
  //    event.preventDefault();
  //    return;
  //  }
  }
  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let inputValue = input.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9-.{1}]/g, '');

    // Limit decimal places
    if (this.decimalPlaces > 0) {
      const decimalIndex = inputValue.indexOf('.');
      if (decimalIndex !== -1) {
        const integerPart = inputValue.slice(0, decimalIndex);
        const anotherDecimalIndex = inputValue.slice(decimalIndex + 1, decimalIndex + 1 + this.decimalPlaces).indexOf('.');
        if (anotherDecimalIndex === -1) {
          const decimalPart = inputValue.slice(decimalIndex + 1, decimalIndex + 1 + this.decimalPlaces);
          inputValue = `${integerPart}.${decimalPart}`;
        }
        else {
          inputValue = inputValue.replace(/[^0-9]/g, '');
          const decimalPart = inputValue.slice(decimalIndex, decimalIndex + 1 + this.decimalPlaces);
          inputValue = `${integerPart}.${decimalPart}`;
        }
      }
    }
    else {
      inputValue = inputValue.replace(/[^0-9]/g, '');
    }
    if (inputValue.trim() === '') {
      inputValue = '0';
    }
    inputValue = inputValue.replace(/^0+([1-9])/, '$1');
    if (+inputValue === 0) {
      inputValue = '0';
    }

    const numericValue = parseFloat(inputValue);
    //inputValue = isNaN(numericValue) ? '' : Math.min(numericValue, this.maxValue).toString();

    input.value = inputValue;
    this.renderer.setProperty(input, 'value', inputValue);
  }

  @HostListener('blur', ['$event']) onBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    let inputValue = input.value;

    // Remove trailing decimal point if present
    if (this.decimalPlaces === 0) {
      inputValue = inputValue.replace(/\.$/, '');
    }
    if (inputValue.trim() === '') {
      inputValue = '0';
    }
    inputValue = inputValue.replace(/^0+([1-9])/, '$1');
    if (+inputValue === 0) {
      inputValue = '0';
    }

    const numericValue = parseFloat(inputValue);
    inputValue = isNaN(numericValue) ? '' : Math.min(Math.max(numericValue, this.minValue), this.maxValue).toString();

    input.value = inputValue;
    this.renderer.setProperty(input, 'value', inputValue);
  }
}
