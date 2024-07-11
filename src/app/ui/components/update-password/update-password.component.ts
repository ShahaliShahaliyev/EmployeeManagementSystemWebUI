import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerTypes } from 'src/app/base/base.component';
import { AlertifyService, MessageTypes, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService,
    private activateRoute: ActivatedRoute, private alertifyService: AlertifyService,
    private userService: UserService,private router:Router) {
    super(spinner)
  }

  state: any;

  ngOnInit(): void {
    this.showSpinner(SpinnerTypes.SquareJellyBox)
    this.activateRoute.params.subscribe({
      next: async params => {
        const userId: number = params["userId"];
        const resetToken: string = params["resetToken"];

        this.state = await this.userAuthService.verifyResetToken(resetToken, userId), () => {

          this.hideSpinner(SpinnerTypes.SquareJellyBox);
        }
      }
    })

  }

  updatePassword(password: string, passwordConfirm: string) {
    this.showSpinner(SpinnerTypes.SquareJellyBox);
    if (password != passwordConfirm) {
      this.alertifyService.message("Passwords do not match", {
        messageType: MessageTypes.Error,
        position: Position.TopRight
      });
      this.hideSpinner(SpinnerTypes.SquareJellyBox);
      return;
      return;
    }
    this.activateRoute.params.subscribe({
      next: async params => {
        const userId: number = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm, 
          ()=> {
          this.alertifyService.message("Successfully updated your password", {
            messageType: MessageTypes.Success,
            position: Position.TopRight
          })
          this.router.navigate(['/login'])
          },
            error => {

            });
            this.hideSpinner(SpinnerTypes.SquareJellyBox);
        }
     })

  }

}
