import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { PositionsComponent } from './positions.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    PositionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:PositionsComponent}
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatTableModule,MatPaginatorModule,MatDialogModule
  ]
})
export class PositionsModule { }
