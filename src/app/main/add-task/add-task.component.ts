import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from 'src/app/_animations/slide-in.animation';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/shared/service/task.service';
import { PublishService } from 'src/app/shared/service/publish.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserTask } from 'src/app/shared/_model/UserTask';
import { MessageService } from 'src/app/shared/service/message.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class AddTaskComponent implements OnInit {
  public title: string;
  public currentTask: any = {};
  public newTask: UserTask;
  public saving = false;
  public taskForm: FormGroup;
  localStartDate: any;
  localFinishDate: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private publishService: PublishService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.getTask();
  }

  private getTask() {
    const taskId = this.route.snapshot.params.id;
    if (!taskId) {
      this.title = 'Add Task';
      this.newTask = new UserTask();
      this.localStartDate = moment().local().format('YYYY-MM-DDTHH:mm');
      this.localFinishDate = moment().local().format('YYYY-MM-DDTHH:mm');
      this.taskForm.patchValue(
        {
          startDate: this.localStartDate,
          finishDate: this.localFinishDate,
        });
    }
    if (taskId) {
      this.title = 'Edit Task';
      this.taskService.findById(taskId)
        .subscribe(
          (data) => {
            this.currentTask = data.user.taskList[0];
            this.localStartDate = moment(this.currentTask.startDate).local().format('YYYY-MM-DDTHH:mm');
            this.localFinishDate = moment(this.currentTask.finishDate).local().format('YYYY-MM-DDTHH:mm');
            this.taskForm.patchValue(
              {
                name: this.currentTask.name,
                comment: this.currentTask.comment,
                startDate: this.localStartDate,
                finishDate: this.localFinishDate,
              });
          },
          (error) => {
            this.router.navigate(['/tasks']);
            this.messageService.error(error);
          });
    }
  }

  private initializeForm() {
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      comment: [''],
      startDate: ['', Validators.required],
      finishDate: ['', Validators.required],
    });
  }

  get formControls() {
    return this.taskForm.controls;
  }

  saveTask() {
    if (this.taskForm.invalid) {
      return;
    }
    this.saving = true;
    this.currentTask.name = this.formControls.name.value;
    let m = moment(this.formControls.startDate.value).utc();
    this.currentTask.startDate = m;
    m = moment(this.formControls.finishDate.value).utc();
    this.currentTask.finishDate = m;
    this.currentTask.comment = this.formControls.comment.value;

    const action = this.currentTask._id ? 'update' : 'create';
    this.taskService[action](this.currentTask)
      .subscribe(
        () => {
          this.router.navigate(['/tasks']);
          this.publishService.publish('tasks-updated');
        },
        (error) => {
          this.router.navigate(['/tasks']);
          this.messageService.error(error);
        }
      );
    this.saving = false;
  }
}
