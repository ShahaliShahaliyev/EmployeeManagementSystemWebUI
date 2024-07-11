import { Component,OnInit } from '@angular/core';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

constructor(private alertify:AlertifyService){}

  ngOnInit(): void {
    this.alertify.message("salam",{
      messageType:MessageTypes.Success,
      delay:3,
      position:Position.TopRight,
    })
    
  }

}
