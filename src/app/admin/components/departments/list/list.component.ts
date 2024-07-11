import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { List_Departments } from 'src/app/contracts/list_deartments';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';

declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,private departmentService:DepartmentService,private alertifyService:AlertifyService){
    super(spinner);
  }
  displayedColumns: string[] = ['name', 'createdDate', 'deletedDate', 'modifiedDate','isDeleted','edit','delete'];
  dataSource : MatTableDataSource<List_Departments>=null;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  async getDepartments() {
    this.showSpinner(SpinnerTypes.SquareJellyBox);
   const allDepartments:{totalCount:number;departments:List_Departments[]}= await this.departmentService.read(this.paginator ? this.paginator.pageIndex : 0,
    this.paginator ? this.paginator.pageSize:5,()=>this.hideSpinner(SpinnerTypes.SquareJellyBox),errorMessage=>
    this.alertifyService.message(errorMessage,{
      messageType:MessageTypes.Error,
      position:Position.TopRight
    }))
    this.dataSource=new MatTableDataSource<List_Departments>(allDepartments.departments);
    this.paginator.length=allDepartments.totalCount;
    }

    async pageChanged(){
      await this.getDepartments();
    }
    async ngOnInit() {
      await this.getDepartments();   
  }

}
