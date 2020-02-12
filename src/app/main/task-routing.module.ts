import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [
    {
        path: 'tasks', component: TaskComponent, children: [
            { path: 'add', component: AddTaskComponent },
            { path: 'edit/:id', component: AddTaskComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }