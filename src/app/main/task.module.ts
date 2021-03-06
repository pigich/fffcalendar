import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { SharedModule } from '../shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';
import { SharingComponent } from './sharing/sharing.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    TaskComponent,
    AddTaskComponent,
    SharingComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    TaskRoutingModule,
    NgxPaginationModule
  ],
  exports: [
    AddTaskComponent,
    TaskComponent
  ]
})
export class TaskModule { }
