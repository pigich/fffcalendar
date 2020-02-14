import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserTask } from '../_model/UserTask';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public testEvents = [
    // new Date(2020, 1, 22, 10, 20)   = Sat Feb 22 2020 10:20:00 GMT+0300 (Moscow Standard Time)
    // 1584872400000
    { _id: 1, name: 'task1', startDate: new Date(1582366800000), finishDate: new Date(1582370400000), comment: 'comment1' },
    { _id: 1, name: 'task2', startDate: new Date(1582881600000), finishDate: new Date(1582892400000), comment: 'comment2' },
    { _id: 1, name: 'task3', startDate: new Date(1581348000000), finishDate: new Date(1581434400000), comment: 'comment3' },
    { _id: 1, name: 'task4', startDate: new Date(1581866400000), finishDate: new Date(1581880800000), comment: 'comment4' },
  ];

  constructor(private http: HttpClient) { }

  findAllUserEvents(id: string): Observable<UserTask> {
    return this.http.get(`http://localhost:1337/events?_id=${id}`)
      .pipe(map((event: UserTask) => event[0] ? event[0] : undefined));
  }

  // getEvents(): Array<UserTask> {

  //   return this.testEvents;
  // }

}
