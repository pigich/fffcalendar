import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from 'src/app/_animations/slide-in.animation';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserTask } from 'src/app/shared/_model/UserTask';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/shared/service/task.service';
import { MessageService } from 'src/app/shared/service/message.service';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class SharingComponent implements OnInit {
  public title: string;
  public selectedTask: any;
  public saving = false;
  public taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initializeForm();
    const taskId = this.route.snapshot.params.id;
  }

  private initializeForm() {
    this.taskForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('[a-zA-Z ]*')]],
    });
  }

  get formControls() {
    return this.taskForm.controls;
  }

  shareTask() {
    if (this.taskForm.invalid) {
      return;
    }
    this.saving = true;
    this.selectedTask = JSON.parse(sessionStorage.getItem('selectedTask'));
    this.taskService.share(this.formControls.login.value, this.selectedTask)
      .subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        (error) => {
          this.messageService.error(error);
        }
      );
    this.saving = false;
  }
}
