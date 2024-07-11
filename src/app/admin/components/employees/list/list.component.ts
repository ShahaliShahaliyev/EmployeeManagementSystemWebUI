import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { List_Departments } from 'src/app/contracts/list_deartments';
import { list_Employees } from 'src/app/contracts/list_employees';
import { List_Position } from 'src/app/contracts/position/position_list';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { PositionService } from 'src/app/services/common/models/position.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
     private employeeService: EmployeeService,
      private alertifyService: AlertifyService,
      private dialogService: DialogService
    ) {
    super(spinner);
  }
  displayedColumns: string[] = ['name','surname','dateOfBirth','createDate','modifiedDate','deletedDate','edit', 'delete'];
  dataSource: MatTableDataSource<list_Employees> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getEmployees() {
    this.showSpinner(SpinnerTypes.SquareJellyBox);
    const allEmployees: { totalCount: number; employees: list_Employees[] } = await this.employeeService.read(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerTypes.SquareJellyBox), errorMessage =>
      this.alertifyService.message(errorMessage, {
        messageType: MessageTypes.Error,
        position: Position.TopRight
      }))
    this.dataSource = new MatTableDataSource<list_Employees>(allEmployees.employees);
    this.paginator.length = allEmployees.totalCount;
  }

  async pageChanged() {
    await this.getEmployees();
  }
  async ngOnInit() {
    await this.getEmployees();
  }

  // AddToDepartment(id: number) {
    
  //   this.dialogService.openDialog({
  //     componentType: EmployeeDepartmentDialogComponent,      
  //     data: id,
  //     options: {
  //       width: "750px"
  //     },      
  //     afterClosed: () => {
  //       this.alertifyService.message("Departments added successfully!", {
  //         messageType: MessageTypes.Success,
  //         position: Position.TopRight
  //       })
        
  //     }      
  //   });
  // }  

}
