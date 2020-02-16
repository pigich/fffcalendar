import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/shared/service/task.service';
import { UserTask } from 'src/app/shared/_model/UserTask';
import { first } from 'rxjs/operators';
import { MessageService } from 'src/app/shared/service/message.service';
import { Subscription } from 'rxjs';
import { PublishService } from 'src/app/shared/service/publish.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  public DATE_PATTERN = ['DD.MM', 'DD-MM', 'DD/MM/YYYY', 'DD.MM.YYYY',
    'DD-MM-YYYY', 'DD-MM-YYYY HH:mm'];
  public p = 1;
  public objectKeys = Object.keys;
  public task: any = new UserTask();
  public taskList: Array<UserTask>;
  public selectedTask: UserTask;
  public selectedKey: string;
  public subscription: Subscription;
  public loading = false;
  public returnUrl: string;
  public findForm: FormGroup;
  public pageOfItems: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private messageService: MessageService,
    private router: Router,
    private publishService: PublishService
  ) { }

  ngOnInit() {
    this.loadTasks();
    this.subscription =
      this.publishService.on('tasks-updated').subscribe(() => this.loadTasks());

    this.findForm = this.formBuilder.group({
      find: [null, [Validators.required, Validators.maxLength(25)]],
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
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

  trancateString(value: string) {
    if (value.length > 15) {
      return value.slice(0, 15) + '...';
    }
    return value;
  }

  findTask() {
    this.loading = true;
    if (this.selectedKey && this.formControls.find.value) {
      if (this.selectedKey !== 'startDate' && this.selectedKey !== 'finishDate') {
        this.taskService.filterTask(this.selectedKey, this.formControls.find.value)
          .pipe(first())
          .subscribe(
            (data) => {
              this.taskList = data.user.taskList;
            },
            (error) => {
              this.taskList = [];
            });
      }
      this.compareDates(this.selectedKey, this.formControls.find.value);
    }
    if (this.selectedKey && !this.formControls.find.value) {
      this.loadTasks();
    }
    this.loading = false;
  }
  compareDates(date, value) {
    const filteredTaskList = this.taskList.filter((e) => {
      if (e.finishDate === date) {
        return this.DATE_PATTERN.some(pattern => {
          return moment(e.finishDate).format(pattern)
            === moment(value, this.DATE_PATTERN).format(pattern);
        });
      }
      return this.DATE_PATTERN.some(pattern => {
        return moment(e.startDate).format(pattern)
          === moment(value, this.DATE_PATTERN).format(pattern);
      });
    });
    this.taskList = filteredTaskList;
    return filteredTaskList;
  }

  get formControls() {
    return this.findForm.controls;
  }

  selectKey(value: string) {
    this.selectedKey = value;
  }

  deleteTask(taskId: string) {
    this.loading = true;
    this.taskService.deleteTaskById(taskId)
      .subscribe(
        () => {
          this.taskList = this.taskList.filter(x => x._id !== taskId);
        },
        (error) => {
          this.messageService.error(error);
          this.taskList = [];
        });
    this.loading = false;
  }

  private saveTaskToSessionStorage(taskId: string) {
    const selectedTask = this.taskList.find((task) => task._id === taskId);
    sessionStorage.setItem('selectedTask', JSON.stringify(selectedTask));
  }

  shareTask(id: string) {
    this.saveTaskToSessionStorage(id);
    this.router.navigate([`/tasks/share/${id}`]);
  }

  getSelectedTask(task: UserTask) {
    return this.selectedTask = task;
  }

  editTask(event, task: UserTask) {
    if (!event.target.className.includes('delete-task-td')
      && !event.target.className.includes('share-task-td')) {
      const taskId = task._id;
      this.saveTaskToSessionStorage(taskId);
      this.router.navigate([`/tasks/edit/${taskId}`]);
    }
  }

}
