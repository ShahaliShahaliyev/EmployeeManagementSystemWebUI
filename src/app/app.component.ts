import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageTypes, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EmployeeManagementClient';
  constructor(private toastrService:CustomToastrService,
    public authService:AuthService,private router:Router
    ){
      authService.identityCheck();
    }

    signOut(){
      localStorage.removeItem("accessToken");
      this.authService.identityCheck();
      this.router.navigate(['']);
      this.toastrService.message("Logged out","Logged out",{
        messageType:ToastrMessageTypes.Info,
        position:ToastrPosition.TopRight
      })
    }
}

$.get("https://localhost:7038/api/position",data=>{
  console.log(data)
})

