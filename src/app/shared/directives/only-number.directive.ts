import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})

export class OnlyNumberDirective {
  regexStr = '^[0-9]*$';
  constructor(private el: ElementRef) { }
  
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
    // Ensure that it is a number and stop the keypress
    // backspace and tab
    if (
      !(event.keyCode === 8 || event.keyCode === 46 || event.key == 'Tab')
      && (e.key === ' ' || isNaN(Number(e.key)))) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData('text/plain')
      .replace(/\D/g, ''); // get a digit-only string
    document.execCommand('insertText', false, pastedInput);
  }

  // @HostListener('document:keydown.tab', ['$event'])
  // onKeydownHandler(event: KeyboardEvent) {
  //   console.log('only number keydown tab');
  //   // event.preventDefault();
  // }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const textData = event.dataTransfer
      .getData('text').replace(/\D/g, '');
    document.execCommand('insertText', false, textData);
  }
}