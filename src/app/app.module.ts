import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { AuthorizeMenuDialogComponent } from './dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule } from  '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { AuthorizeUserDialogComponent } from './dialogs/authorize-user-dialog/authorize-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter : ()=>localStorage.getItem("accessToken"),
        allowedDomains : ["localhost:7038"]
      }
    })
  ],
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:7038/api",multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
