import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeesModule } from './components/employees/employees.module';
import { HomeModule } from './components/home/home.module';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //ComponentsModule,
    EmployeesModule,
    HomeModule
  ]
})
export class UiModule { }
