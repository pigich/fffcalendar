import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/service/authentication.service';
import { BaseData } from './shared/_model/BaseData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUserData: BaseData;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUserData.subscribe(data => this.currentUserData = data);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
