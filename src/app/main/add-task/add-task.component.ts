import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from 'src/app/_animations/slide-in.animation';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/shared/service/task.service';
import { PublishService } from 'src/app/shared/service/publish.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserTask } from 'src/app/shared/_model/UserTask';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class AddTaskComponent implements OnInit {
  title: string;
  task: any = {};
  saving = false;
  public taskForm: FormGroup;
  public loading = false;
  public selectedTask: UserTask = new UserTask();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private publishService: PublishService,
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.maxLength(20)],
      comment: ['', Validators.maxLength(100)]
    });
    this.title = 'Add Task';

    const taskId = Number(this.route.snapshot.params.id);
    console.log('!!!!!!!!!!!!!!!!!taskId ', taskId);
    if (taskId) {
      this.title = 'Edit Task';
      this.taskService. findById(taskId).subscribe(x => this.task = x);
    }
  }

  get formControls() {
    return this.taskForm.controls;
  }

  saveTask() {
    this.saving = true;
    const action = this.task.id ? 'update' : 'create';
    this.taskService[action](this.task)
      .subscribe(() => {
        this.saving = false;
        this.router.navigate(['tasks']);
        this.publishService.publish('tasks-updated');
      });
  }
}
