import { DialogComponent } from './dialog.component';

export class DialogService {

  registeredDialog: DialogComponent;

  register(dialog: DialogComponent, title? , modalBody? , ok?,  cancel?) {
    this.registeredDialog = dialog;
    this.registeredDialog.title = title || "Modal title";
    this.registeredDialog.modalBody = modalBody || "Modal body text goes here.";
    this.registeredDialog.ok = ok || "OK";
    this.registeredDialog.cancel = cancel || "cancel";
  }

  show() {
    return new Promise((resolve, reject) => {

      this.registeredDialog.show();
      this.registeredDialog.onOk.subscribe(() => {
        this.registeredDialog.hide();
        resolve();
      });
      this.registeredDialog.onCancel.subscribe(() => {
        this.registeredDialog.hide();
        reject();
      });

    });
  }

}