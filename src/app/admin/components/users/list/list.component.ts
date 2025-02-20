import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { List_User } from 'src/app/contracts/users/list_user';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['userName', 'email', 'surname', 'name','isActive','isDeleted', 'role', 'delete'];
  dataSource: MatTableDataSource<List_User> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getUsers() {
    this.showSpinner(SpinnerTypes.SquareJellyBox);
    
    const allUsers: { totalUsersCount: number; users: List_User[] } = await this.userService.getAllUsers
    (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => 
    this.hideSpinner(SpinnerTypes.SquareJellyBox), errorMessage => this.alertifyService.message(errorMessage, {
     
      messageType: MessageTypes.Error,
      position: Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
    this.paginator.length = allUsers.totalUsersCount;
    
  }

 

  async pageChanged() {
    await this.getUsers();
  }

  async ngOnInit() {
    await this.getUsers();
  }

  assignRole(id: number) {
    
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,      
      data: id,
      options: {
        width: "750px"
      },      
      afterClosed: () => {
        this.alertifyService.message("Roles assigned successfully!", {
          messageType: MessageTypes.Success,
          position: Position.TopRight
        })
        
      }      
    });
  }
}