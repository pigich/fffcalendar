import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../calendar/calendar.component';
import { SharedModule } from '../shared/shared.module';
import { SystemComponent } from './system.component';



@NgModule({
  declarations: [
    CalendarComponent,
    SystemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class SystemModule { }
