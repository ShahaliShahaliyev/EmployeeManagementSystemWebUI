import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { Create_Department } from 'src/app/contracts/department_create';
import { Create_Employee } from 'src/app/contracts/employee_create';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';
import { EmployeeService } from 'src/app/services/common/models/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService, private employeeService:EmployeeService,private alertify:
    AlertifyService){
    super(spinner)
  }
  ngOnInit(): void {

  }

  @Output() createdEmployee: EventEmitter<Create_Employee> = new EventEmitter();

  create(name:HTMLInputElement,
    surname:HTMLInputElement,
    birthDate:HTMLInputElement
  ){
    this.showSpinner(SpinnerTypes.SquareJellyBox);
    const create_Employee:Create_Employee = new Create_Employee();
    create_Employee.name=name.value;
    create_Employee.surname=surname.value;
    create_Employee.birthDate=(birthDate.value);

    this.employeeService.create(create_Employee,()=>{
      this.hideSpinner(SpinnerTypes.SquareJellyBox);
      this.alertify.message("Added Succesfully",{
        messageType:MessageTypes.Success,
        position:Position.TopRight
      });
      this.createdEmployee.emit(create_Employee);

    },errorMessage=>{
      this.alertify.message(errorMessage,{
        messageType:MessageTypes.Error,
        position:Position.TopRight
      }); 
    });

  }


}
