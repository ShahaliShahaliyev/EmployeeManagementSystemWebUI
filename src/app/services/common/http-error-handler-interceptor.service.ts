import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageTypes, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("You are not authorized to perform this action!", "Unauthorized", {
            messageType: ToastrMessageTypes.Warning,
            position: ToastrPosition.TopRight
          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("The server cannot be reached", "Server Error!", {
            messageType: ToastrMessageTypes.Warning,
            position: ToastrPosition.TopRight
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Invalid request made!", "invalid request", {
            messageType: ToastrMessageTypes.Warning,
            position: ToastrPosition.TopRight
          });
          break;
        case HttpStatusCode.NotFound:          
          this.toastrService.message("Page not found!", "Page not found", {
            messageType: ToastrMessageTypes.Warning,
            position: ToastrPosition.TopRight
          });
          break;

        default:
          this.toastrService.message("Unexpected error occurred!", "Error", {
            messageType: ToastrMessageTypes.Warning,
            position: ToastrPosition.TopRight
          });
          break;

      }
      return of(error);
    }));
  }
}
