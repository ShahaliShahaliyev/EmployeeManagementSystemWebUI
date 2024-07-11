import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { Create_Department } from 'src/app/contracts/department_create';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { Position_Create } from 'src/app/contracts/position/position_create';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService){
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerTypes.SquareJellyBox);
    
  }

  @ViewChild(ListComponent) listComponents: ListComponent
  createdPosition(createdPosition:Position_Create){
    this.listComponents.getPositions();
  }

}

