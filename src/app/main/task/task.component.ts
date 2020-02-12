import { Component, OnInit, HostListener } from '@angular/core';
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
export class TaskComponent implements OnInit {
  public taskList: Array<UserTask>;
  public selectedTask: UserTask = new UserTask();
  public subscription: Subscription;
  public loading = false;
  returnUrl: string;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService,
    private router: Router,
    private publishService: PublishService
  ) { }
  ngOnInit() {
    this.getTasks();
    this.subscription =
      this.publishService.on('tasks-updated').subscribe(() => this.getTasks());
  }

  getTasks() {
    this.taskService.findAll()
      .pipe(first())
      .subscribe((data) => {
        this.taskList = data.user.taskList;
      },
        error => {
          this.messageService.error(error);
          this.taskList = [];
        });
  }

  deleteTask(id: number) {
    this.loading = true;
    this.taskService.delete(id).subscribe(() => {
      this.taskList = this.taskList.filter(x => x.id !== id);
    });
    this.loading = false;
  }

  getSelected(task: UserTask, id: string) {
    return task === this.selectedTask;
  }

  edit(task: UserTask) {
    const taskId = Number(task.id);
    this.router.navigate([`/tasks/edit/${taskId}`]);
  }

}
