import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { List_Departments } from 'src/app/contracts/list_deartments';
import { list_Emp_Params } from 'src/app/contracts/list_employees';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';
import { EmployeeService } from 'src/app/services/common/models/employee.service';

@Component({
  selector: 'app-employee-and-department',
  templateUrl: './employee-and-department.component.html',
  styleUrls: ['./employee-and-department.component.scss']
})
export class EmployeeAndDepartmentComponent  extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
     private employeeService: EmployeeService,
      private alertifyService: AlertifyService,
      private dialogService: DialogService
    ) {
    super(spinner);
  }
  displayedColumns: string[] = ['name','surname','department','position','manager'];
  dataSource: MatTableDataSource<list_Emp_Params> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getEmployees() {
    this.showSpinner(SpinnerTypes.SquareJellyBox);
    const allEmployees: { totalCount: number; employees: list_Emp_Params[] } = await this.employeeService.read(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerTypes.SquareJellyBox), errorMessage =>
      this.alertifyService.message(errorMessage, {
        messageType: MessageTypes.Error,
        position: Position.TopRight
      }))
    this.dataSource = new MatTableDataSource<list_Emp_Params>(allEmployees.employees);
    this.paginator.length = allEmployees.totalCount;
  }

  async pageChanged() {
    await this.getEmployees();
  }
  async ngOnInit() {
    await this.getEmployees();
  }
}

