import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuardService } from './shared/service/auth-guard.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { TaskRoutingModule } from './main/task-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuardService] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    TaskRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
