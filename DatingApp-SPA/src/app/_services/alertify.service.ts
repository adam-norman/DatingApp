import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      }
    });
  }
  success(message: string) {
    alertify.success(message, 3);
  }
  waning(message: string) {
    alertify.waning(message, 3);
  }
  error(message: string) {
    alertify.error(message, 3);
  }
  message(message: string) {
    alertify.message(message, 3);
  }
}
