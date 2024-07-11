import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
constructor(private spinner:NgxSpinnerService){}
showSpinner(spinnerType:SpinnerTypes){
  this.spinner.show(spinnerType);
  setTimeout(() => this.hideSpinner(spinnerType),1000);

}

hideSpinner(spinnerType:SpinnerTypes){
  this.spinner.hide(spinnerType);

}
}

export enum SpinnerTypes{
  SquareJellyBox="s1"
}
