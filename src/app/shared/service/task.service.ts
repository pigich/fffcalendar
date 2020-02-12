import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserTask } from '../_model/UserTask';
import { AuthenticationService } from './authentication.service';
import { BaseData } from '../_model/BaseData';
import { BaseApi } from './base-api';

@Injectable({ providedIn: 'root' })
export class TaskService extends BaseApi {
  private userId: number;

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    super(http);
  }

  findAll(): Observable<BaseData> {
    if (this.authenticationService.currentUserValue) {
      this.userId = this.authenticationService.currentUserValue.user.id;
      return this.get(`tasks?id=${this.userId}`)
        .pipe(map((tasks: BaseData) => tasks ? tasks : undefined));
    }
  }

  findById(id: number) {
    console.log('user id ', this.userId);
    return this.get(`tasks/${id}?id=${this.userId}`);
  }

  create(task: any) {
    return this.http.post<any>(`tasks`, task);
  }

  update(task: any) {
    return this.http.put<any>(`tasks/${task.id}`, task);
  }

  delete(task: any) {
    return this.http.delete<any>(`tasks/${task.id}`);
  }

}

