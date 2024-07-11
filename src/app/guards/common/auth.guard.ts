import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, 
  UrlTree,
  Router
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerTypes } from 'src/app/base/base.component';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageTypes, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastrService: CustomToastrService,
    private ngxSpinner: NgxSpinnerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.ngxSpinner.show(SpinnerTypes.SquareJellyBox);

    // const token: string = localStorage.getItem('accessToken');

    // let expired : boolean;

    // try{
    //   expired = this.jwtHelper.isTokenExpired(token);
    // } catch {
    //   expired=true;
    // }

    if (!_isAuthenticated) {
      this.router.navigate(["login"],{queryParams:{returnUrl:state.url}});
      this.toastrService.message('You need to log in!', 'Unauthorized access', {
        messageType: ToastrMessageTypes.Warning,
        position: ToastrPosition.TopRight
      });
      this.ngxSpinner.hide(SpinnerTypes.SquareJellyBox);
      //return this.router.createUrlTree(["login"], { queryParams: { returnUrl: state.url } });
    }
     
    
    this.ngxSpinner.hide(SpinnerTypes.SquareJellyBox);
    return true;
  }
}
