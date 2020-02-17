import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { MessageService } from 'src/app/shared/service/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public returnUrl = '/tasks';
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/tasks']);
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.accessDenied) {
        this.messageService.error('You need to login first');
      }
    });

    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('[a-zA-Z ]*')]],
      password: ['', Validators.required]
    });

  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.authUser(this.formControls.login.value, this.formControls.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
          this.loading = false;
        },
        (error) => {
          this.messageService.error(error);
          this.loading = false;
        });
    this.loading = false;
  }
}
