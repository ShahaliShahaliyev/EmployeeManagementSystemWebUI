import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { List_Role } from 'src/app/contracts/role/list_Role';
import { RoleService } from 'src/app/services/common/models/role.service';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypes } from 'src/app/base/base.component';


@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    private roleService: RoleService,
    private spinner:NgxSpinnerService,
    private authorizationEndpointService:AuthorizationEndpointService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(dialogRef)
  }

  roles: { datas: List_Role[], totalRoleCount: number };
  assignedRoles: Array<string>;
  listRoles: { name: string, selected: boolean }[];
  async ngOnInit(){
    this.assignedRoles = await this.authorizationEndpointService.getRolesToEndpoint(this.data.code, this.data.menuName);

    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1
      }
    });
  }

  assignRoles(rolesComponent:MatSelectionList){
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._elementRef.nativeElement.innerText);
    this.spinner.show(SpinnerTypes.SquareJellyBox);
    this.authorizationEndpointService.assignRoleEndpoint(roles,this.data.code,this.data.menuName,
      ()=>{
        this.spinner.hide(SpinnerTypes.SquareJellyBox);
      },error =>{

      })
  }
}

export enum AuthorizeMenuState {
  Yes,
  No
}