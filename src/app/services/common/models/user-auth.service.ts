import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageTypes, ToastrPosition } from '../../ui/custom-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenRespose } from 'src/app/contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async login(usernameOrEmail: string, password: string, callbackFunction?: () => void): Promise<void> {
    const observable: Observable<any | TokenRespose> = this.httpClientService.post<any | TokenRespose>({
      controller: "auth",
      action: "login"
    }, { usernameOrEmail, password })

    const tokenResponse: TokenRespose = await firstValueFrom(observable) as TokenRespose;
    if (tokenResponse)
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
    //localStorage.setItem("expiration",token.expiration.toString());

    this.toastrService.message("Login successful", "Welcome " + usernameOrEmail, {
      messageType: ToastrMessageTypes.Success,
      position: ToastrPosition.TopRight
    });
    callbackFunction();
  }

  async passwordReset(email: string, callbackFunction?: () => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "password-reset"
    }, { email: email });

    await firstValueFrom(observable);
    callbackFunction();
  }

  async verifyResetToken(resetToken: string, userId: number, callbackFunction?: () => void) :
  Promise<boolean>{
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "verify-reset-token"
    }, {
      resetToken: resetToken,
      userId: userId
    });
    const state : boolean = await firstValueFrom(observable);
    callbackFunction();
    return state;
  }

}
