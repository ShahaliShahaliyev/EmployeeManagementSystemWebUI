import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { EmployeesModule } from './ui/components/employees/employees.module';
import { RegisterModule } from './ui/components/register/register.module';
import { LoginModule } from './ui/components/login/login.module';
import { AuthGuard } from './guards/common/auth.guard';
import { PasswordResetModule } from './ui/components/password-reset/password-reset.module';
import { UpdatePasswordModule } from './ui/components/update-password/update-password.module';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent },
      {
        path: "departments", loadChildren: () => import("./admin/components/departments/departments.module").then
          (module => module.DepartmentsModule),canActivate:[AuthGuard]
      },
      {
        path: "positions", loadChildren: () => import("./admin/components/positions/positions.module").then
          (module => module.PositionsModule),canActivate:[AuthGuard]
      },
      {
        path: "employees", loadChildren: () => import("./admin/components/employees/employees.module").then
          (module => module.EmployeesModule),canActivate:[AuthGuard]
      },
      {
        path: "users", loadChildren: () => import("./admin/components/users/users.module").then
          (module => module.UsersModule),canActivate:[AuthGuard]
      },
      {
        path: "authorize-menu", loadChildren: () => import("./admin/components/authorize-menu/authorize-menu.module").then
          (module => module.AuthorizeMenuModule),canActivate:[AuthGuard]
      },      
      {
        path: "roles", loadChildren: () => import("./admin/components/role/role.module").then
          (module => module.RoleModule),canActivate:[AuthGuard]
      },
      {
        path: "employee-and-department", loadChildren: () => import("./admin/components/employee-and-department/employee-and-department.module").then
          (module => module.EmployeeAndDepartmentModule),canActivate:[AuthGuard]
      },
    ],canActivate:[AuthGuard]
  },
  { path: "", component: HomeComponent },
  {
    path: "employees", loadChildren: () => import("./ui/components/employees/employees.module").then
      (module => EmployeesModule)
  },
  {
    path: "register", loadChildren: () => import("./ui/components/register/register.module").then
      (module => RegisterModule)
  },

  {
    path: "login", loadChildren: () => import("./ui/components/login/login.module").then
      (module => LoginModule)
  },

  {
    path: "password-reset", loadChildren: () => import("./ui/components/password-reset/password-reset.module").then
      (module =>module. PasswordResetModule)
  },

  {
    path: "update-password/:userId/:resetToken", loadChildren: () => import("./ui/components/update-password/update-password.module").then
      (module => module.UpdatePasswordModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
