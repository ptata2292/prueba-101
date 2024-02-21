import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCreditCard]'
})
export class CreditCardDirective {

  constructor(private el: ElementRef) { }
  @HostBinding('style.border')
  border: string;

  regexStr = '^[0-9]*$';
    
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter, etc
      // this.navigationKeys.indexOf(e.key) > -1 || 
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Cmd+X (Mac)
    ) {
      return;  // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress and 
    // backspace and tab
    if (
      !(event.keyCode === 8 || event.keyCode === 46 || event.key == 'Tab')
      && (e.key === ' ' || isNaN(Number(e.key)))) {
      e.preventDefault();
    } else {
      const input = event.target as HTMLInputElement;
      // console.log(input.value);

      let trimmed = input.value.replace(/\s+/g, '');
      if (trimmed.length > 16) {
        trimmed = trimmed.substr(0, 16);
      }

      let numbers = [];
      for (let i = 0; i < trimmed.length; i += 4) {
        numbers.push(trimmed.substr(i, 4));
      }

      input.value = numbers.join(' ');

      /*this.border = '';
      if (/[^\d]+/.test(trimmed)) {
        this.border = '1px solid red';
      }*/
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    // console.log('onPaste');
    event.preventDefault();
    let pastedInput: string = event.clipboardData
      .getData('text/plain')
      .replace(/\D/g, ''); // get a digit-only string
      pastedInput = this.formatedCardNumber(pastedInput);
    document.execCommand('insertText', false, pastedInput);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    // console.log('onDrop');
    event.preventDefault();
    let textData = event.dataTransfer
      .getData('text').replace(/\D/g, '');
    textData = this.formatedCardNumber(textData);
    document.execCommand('insertText', false, textData);
  }

  // @HostListener('document:keydown.tab', ['$event'])
  // onKeydownHandler(event: KeyboardEvent) {
  //   console.log('credit card keydown tab');
  //   // event.preventDefault();
  // }

  formatedCardNumber(input) {
    let numbers = [];
    for (let i = 0; i < input.length; i += 4) {
      numbers.push(input.substr(i, 4));
    }
    return numbers.join(' ');
  }
}
