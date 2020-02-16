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

  findById(id: string): Observable<BaseData> {
    return this.get(`tasks/${id}?userId=${this.userId}`)
      .pipe(map((data: BaseData) => {
        return data ? data : undefined;
      }
      ));
  }

  create(task: any) {
    return this.put(`tasks/create`, { userId: this.userId, task });
  }

  update(task: any) {
    return this.put(`tasks/update`, { userId: this.userId, task });
  }

  deleteTaskById(id: string) {
    return this.delete(`tasks/delete/${id}?userId=${this.userId}`);
  }

  share(login: string, task: any) {
    return this.put(`tasks/share`, { login, task });
  }

  filterTask(key: string, value: string): Observable<BaseData> {
    return this.get(`tasks/filter/task?userId=${this.userId}&taskKey=${key}&keyValue=${value}`);
  }
}

