import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit{
  constructor(spinner:NgxSpinnerService,
     private roleService:RoleService,
    private alertify: AlertifyService) {
    super(spinner)
  }
  ngOnInit(): void {

  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name:HTMLInputElement){
    this.showSpinner(SpinnerTypes.SquareJellyBox);

    this.roleService.create(name.value,()=>{
      this.hideSpinner(SpinnerTypes.SquareJellyBox);
      this.alertify.message("Role Added Succesfully",{
        messageType:MessageTypes.Success,
        position:Position.TopRight
      });
      this.createdRole.emit(name.value);

    },errorMessage=>{
      this.alertify.message(errorMessage,{
        messageType:MessageTypes.Error,
        position:Position.TopRight
      }); 
    });

  }

}
