import { DOCUMENT } from '@angular/common';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {

  onOk: EventEmitter<any> = new EventEmitter();
  onCancel: EventEmitter<any> = new EventEmitter();
  private backdrop: HTMLElement;
  style: any;
  public title = "Modal title";
  public modalBody = "Modal body text goes here.";
  public ok = "OK";
  public cancel = "cancel";

  constructor( @Inject(DOCUMENT) private document: Document) { }

  okClicked() {
    this.onOk.emit();
  }

  cancelClicked() {
    this.onCancel.emit();
  }

  show() {
    this.document.body.classList.add('modal-open');
    this.style = { 'display': 'block' };
    this.showBackdrop();
  }

  hide() {
    this.document.body.classList.remove('modal-open');
    this.style = { 'display': 'none' };
    this.hideBackdrop();
  }

  showBackdrop() {
    this.backdrop = this.document.createElement('div');
    this.backdrop.classList.add('modal-backdrop');
    this.backdrop.classList.add('show');
    this.document.body.appendChild(this.backdrop);
  }

  hideBackdrop() {
    this.backdrop.remove();
  }

}