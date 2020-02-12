import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { SharedModule } from '../shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [
    TaskComponent,
    AddTaskComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    TaskRoutingModule
  ],
  exports: [
    AddTaskComponent,
    TaskComponent
  ]
})
export class TaskModule { }
