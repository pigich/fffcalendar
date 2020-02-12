import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../_model/User';
import { BaseApi } from './base-api';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  // temp method 
  findUserByLogin(login: string): Observable<User> {
    return this.get(`users?login=${login}`)
      .pipe(map((user: User) => user[0] ? user[0] : undefined));
  }

}
