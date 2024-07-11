
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { DeleteDirective } from '../directives/admin/delete.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule
  ],
  exports: [
    LayoutModule,
  ]
})
export class AdminModule { }
