import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeAndDepartmentComponent } from './employee-and-department.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    EmployeeAndDepartmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:EmployeeAndDepartmentComponent}
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatTableModule,MatPaginatorModule,MatDialogModule
  ]
})
export class EmployeeAndDepartmentModule { }
