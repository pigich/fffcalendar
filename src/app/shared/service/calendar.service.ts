import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserEvent } from '../_model/UserEvent';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public testEvents = [
    // new Date(2020, 1, 22, 10, 20)   = Sat Feb 22 2020 10:20:00 GMT+0300 (Moscow Standard Time)
    // 1584872400000
    { id: 1, name: 'task1', startDate: new Date(1582366800000), finishDate: new Date(1582370400000), comment: 'comment1' },
    { id: 1, name: 'task2', startDate: new Date(1582881600000), finishDate: new Date(1582892400000), comment: 'comment2' },
    { id: 1, name: 'task3', startDate: new Date(1581348000000), finishDate: new Date(1581434400000), comment: 'comment3' },
    { id: 1, name: 'task4', startDate: new Date(1581866400000), finishDate: new Date(1581880800000), comment: 'comment4' },
  ];

  constructor(private http: HttpClient) { }

  findAllUserEvents(id: number): Observable<UserEvent> {
    return this.http.get(`http://localhost:1337/events?id=${id}`)
      .pipe(map((event: UserEvent) => event[0] ? event[0] : undefined));
  }

  getEvents(): Array<UserEvent> {

    return this.testEvents;
  }

}
