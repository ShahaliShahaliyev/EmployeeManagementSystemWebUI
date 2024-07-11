import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { Create_Department } from 'src/app/contracts/department_create';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService){
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerTypes.SquareJellyBox);
    
  }

  @ViewChild(ListComponent) listComponents: ListComponent
  createdDepartment(createdDepartment:Create_Department){
    this.listComponents.getDepartments();
  }

}

