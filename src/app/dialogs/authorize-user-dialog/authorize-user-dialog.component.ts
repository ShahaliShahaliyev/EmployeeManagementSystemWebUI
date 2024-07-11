import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/models/role.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Role } from 'src/app/contracts/role/list_Role';
import { SpinnerTypes } from 'src/app/base/base.component';
import { MatSelectionList } from '@angular/material/list';
import { List_Dep_Assign } from 'src/app/contracts/list_dep_assign';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService: UserService,
    private employeeService :EmployeeService,
    private departmentService:DepartmentService,
    private spinner: NgxSpinnerService) {
    super(dialogRef)
  }
  roles: { datas: List_Role[], totalCount: number };
  assignedRoles: Array<string>;

  departments:{datas:List_Dep_Assign[],totalCount:number};
  assignedDepartments: Array<string>;

  listRoles: { name: string, selected: boolean }[];
  listDepartments: { name: string, selected: boolean }[];
  async ngOnInit() {
    this.spinner.show(SpinnerTypes.SquareJellyBox)
    this.assignedRoles = await this.userService.getRolesToUser(this.data, () => this.spinner.hide(SpinnerTypes.SquareJellyBox));

    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1
      }
    });
  }

  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._elementRef.nativeElement.innerText)
    this.spinner.show(SpinnerTypes.SquareJellyBox);
    this.userService.assignRoleToUser(this.data, roles,
      () => {
        this.spinner.hide(SpinnerTypes.SquareJellyBox);
      }, error => {

      })
  }

  // listDepartments: { name: string, selected: boolean }[];
  // async getDepartmentsForAssign() {
  //   this.spinner.show(SpinnerTypes.SquareJellyBox)
  //   this.assignedDepartments = await this.employeeService.getDepartmentsToEmployee(this.data, () => this.spinner.hide(SpinnerTypes.SquareJellyBox));

  //  this.departments = await this.departmentService.getDepartments(-1, -1);

  //   this.listDepartments = this.departments.datas.map((r: any) => {
  //     return {
  //       name: r.name,
  //       selected: this.assignedDepartments?.indexOf(r.name) > -1
  //     }
  //   });
  // }


}