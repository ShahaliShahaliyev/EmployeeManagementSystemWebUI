import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { Create_Department } from 'src/app/contracts/department_create';
import { Position_Create } from 'src/app/contracts/position/position_create';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';
import { PositionService } from 'src/app/services/common/models/position.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService, private positionService:PositionService,private alertify:
    AlertifyService){
    super(spinner)
  }
  ngOnInit(): void {

  }

  @Output() createdPosition: EventEmitter<Create_Department> = new EventEmitter();

  create(name:HTMLInputElement){
    this.showSpinner(SpinnerTypes.SquareJellyBox);
    const create_Position:Position_Create = new Position_Create();
    create_Position.name=name.value;

    this.positionService.create(create_Position,()=>{
      this.hideSpinner(SpinnerTypes.SquareJellyBox);
      this.alertify.message("Added Succesfully",{
        messageType:MessageTypes.Success,
        position:Position.TopRight
      });
      this.createdPosition.emit(create_Position);

    },errorMessage=>{
      this.alertify.message(errorMessage,{
        messageType:MessageTypes.Error,
        position:Position.TopRight
      }); 
    });

  }


}
