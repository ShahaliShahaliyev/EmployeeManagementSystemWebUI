import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';
import { RoleModule } from './role/role.module';
import { PositionsModule } from './positions/positions.module';
import { EmployeeAndDepartmentComponent } from './employee-and-department/employee-and-department.component';
import { EmployeeAndDepartmentModule } from './employee-and-department/employee-and-department.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EmployeesModule,
    DepartmentsModule,
    UsersModule,
    DashboardModule,
    AuthorizeMenuModule,
    RoleModule,
    PositionsModule,
    EmployeeAndDepartmentModule
  ]
})
export class ComponentsModule { }
