import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/shared/service/task.service';
import { UserTask } from 'src/app/shared/_model/UserTask';
import { first } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/service/message.service';
import { Subscription } from 'rxjs';
import { PublishService } from 'src/app/shared/service/publish.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  public taskList: Array<UserTask>;
  public selectedTask: UserTask;
  public subscription: Subscription;
  public loading = false;
  public returnUrl: string;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private router: Router,
    private publishService: PublishService
  ) { }

  ngOnInit() {
    this.loadTasks();
    this.subscription =
      this.publishService.on('tasks-updated').subscribe(() => this.loadTasks());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadTasks() {
    this.taskService.findAll()
      .pipe(first())
      .subscribe(
        (data) => {
          this.taskList = data.user.taskList;
        },
        error => {
          this.messageService.error(error);
          this.taskList = [];
        });
  }

  deleteTask(id: string) {
    this.loading = true;
    console.log('this.selectedTask.id ', this.selectedTask._id);
    console.log('deleteTask(id: string)  ', id);
    this.taskService.deleteTaskById(id)
      .subscribe(
        () => {
          this.taskList = this.taskList.filter(x => x._id !== id);
        },
        (error) => {
          this.messageService.error(error);
          this.taskList = [];
        });
    this.loading = false;
  }

  getSelected(task: UserTask) {
    return this.selectedTask = task;
  }

  edit(event, task: UserTask) {
    if (!event.target.className.includes('delete-task-td')) {
      console.log('this.selectedTask ', task._id);
      const taskId = task._id;
      this.router.navigate([`/tasks/edit/${taskId}`]);
    }
  }

}
