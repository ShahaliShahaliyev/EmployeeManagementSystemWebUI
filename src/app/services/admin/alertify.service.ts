import { Injectable } from '@angular/core';
declare var alertify:any; 

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message:string,options:Partial<AlertifyOptions>){
    alertify.set('notifier','delay', 3);

    alertify.set('notifier','position', options.position);

    alertify[options.messageType](message);
  }
}

export class AlertifyOptions{
  messageType:MessageTypes=MessageTypes.Success;
  position:Position=Position.TopRight;
  delay:number=3;
}

export enum MessageTypes{
  Message = "message",
  Error ="error",
  Notify="notify",
  Success="success",
  Warning="warning"
}

export enum Position{
  TopRight="top-right"
}
