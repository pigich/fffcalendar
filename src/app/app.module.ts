import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './shared/service/user.service';
import { AuthenticationService } from './shared/service/authentication.service';
import { MessageService } from './shared/service/message.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './shared/_interceptor/error.interceptor';
import { AuthInterceptor } from './shared/_interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    UserService,
    AuthenticationService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
