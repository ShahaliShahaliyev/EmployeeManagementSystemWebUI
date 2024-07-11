import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdatePasswordModule } from './update-password/update-password.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule
  ]
})
export class ComponentsModule { }
