import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }
  message(message:string,title:string,toastrOptions:Partial<ToastrOptions>){
this.toastr[toastrOptions.messageType](message,title,{
  positionClass:toastrOptions.position
});
  }
}

export class ToastrOptions{
  messageType:ToastrMessageTypes;
  position:ToastrPosition

}

export enum ToastrMessageTypes{
  Success="success",
  Warning="warning",
  Info="info",
  Error="error"
}

export enum ToastrPosition{
  TopRight="toast-top-right"
}
