import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { Create_Department } from 'src/app/contracts/department_create';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService, private departmentService:DepartmentService,private alertify:
    AlertifyService){
    super(spinner)
  }
  ngOnInit(): void {

  }

  @Output() createdDepartment: EventEmitter<Create_Department> = new EventEmitter();

  create(name:HTMLInputElement){
    this.showSpinner(SpinnerTypes.SquareJellyBox);
    const create_Department:Create_Department = new Create_Department();
    create_Department.name=name.value;

    this.departmentService.create(create_Department,()=>{
      this.hideSpinner(SpinnerTypes.SquareJellyBox);
      this.alertify.message("Added Succesfully",{
        messageType:MessageTypes.Success,
        position:Position.TopRight
      });
      this.createdDepartment.emit(create_Department);

    },errorMessage=>{
      this.alertify.message(errorMessage,{
        messageType:MessageTypes.Error,
        position:Position.TopRight
      }); 
    });

  }


}
