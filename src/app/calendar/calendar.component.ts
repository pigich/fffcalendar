import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/service/message.service';
import { Router } from '@angular/router';
import { CalendarService } from '../shared/service/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public calendarElement: HTMLElement;
  public monthElement: HTMLElement;
  public yearElement: HTMLElement;
  public selectedMonth: number;
  public selectedYear: number;

  private monthesNames: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  private days: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  private isWeekStartsOnMonday = true;
  private now = new Date();
  private nowMonthNumber = this.now.getMonth();
  private nowYear = this.now.getFullYear();
  private currentMonth = 0;
  private currentYear = 0;
  private selectedDay = 0;
  private eventsData = null;

  constructor(
    private calendarService: CalendarService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.selectedMonth = this.nowMonthNumber;
    this.selectedYear = this.nowYear;
    this.currentMonth = this.selectedMonth;
    this.currentYear = this.selectedYear;
    this.calendarElement = document.querySelector('.calendar');
    this.yearElement = document.querySelector('.calendar-year');
    this.monthElement = document.querySelector('.calendar-month');
    this.showMonthes();
    this.showYears();
    this.showCalendar();
  }
  onMonthChange(value: number) {
    this.currentMonth = +value;
    console.log(this.currentMonth);
    this.showCalendar();
  }
  onYearChange(value: number) {
    this.currentYear = +value;
    console.log(this.currentYear);
    this.showCalendar();
  }

  showMonthes() {
    for (let i = 0; i < 12; i++) {
      const opt = document.createElement('option');
      opt.value = '' + i;
      opt.innerHTML = this.monthesNames[i];
      if (i === this.nowMonthNumber) { opt.selected = true; }
      this.monthElement.appendChild(opt);
    }
  }
  showYears() {
    for (let i = this.nowYear - 10; i <= this.nowYear + 10; i++) {
      const opt = document.createElement('option');
      if (i === this.nowYear) {
        opt.setAttribute('selected', '' + this.nowYear);
        opt.setAttribute('default', '' + this.nowYear);
      }
      opt.value = '' + i;
      opt.innerHTML = '' + i;
      this.yearElement.appendChild(opt);
    }
  }

  showCalendar() {
    this.currentMonth = this.currentMonth;
    this.currentYear = this.currentYear;
    console.log(this.currentMonth, ' ', this.currentYear);
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth, daysInMonth).getDay();

    // load data
    this.eventsData = localStorage.getItem('cal-' + this.currentMonth + '-' + this.currentYear);
    if (this.eventsData == null) {
      localStorage.setItem('cal-' + this.currentMonth + '-' + this.currentYear, '{}');
      this.eventsData = {};
    } else {
      this.eventsData = JSON.parse(this.eventsData);
    }

    // the number of empty squares before start of month
    const squares = [];
    if (this.isWeekStartsOnMonday && firstDayOfMonth !== 1) {
      const blanks = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
      for (let i = 1; i < blanks; i++) { squares.push('b'); }
    }
    if (!this.isWeekStartsOnMonday && firstDayOfMonth !== 0) {
      for (let i = 0; i < firstDayOfMonth; i++) { squares.push('b'); }
    }

    // days of the month
    for (let i = 1; i <= daysInMonth; i++) { squares.push(i); }

    // the number of empty squares after end of month
    if (this.isWeekStartsOnMonday && lastDayOfMonth !== 0) {
      const blanks = lastDayOfMonth === 6 ? 1 : 7 - lastDayOfMonth;
      for (let i = 0; i < blanks; i++) { squares.push('b'); }
    }
    if (!this.isWeekStartsOnMonday && lastDayOfMonth !== 6) {
      const blanks = lastDayOfMonth === 0 ? 6 : 6 - lastDayOfMonth;
      for (let i = 0; i < blanks; i++) { squares.push('b'); }
    }

    // calendar container and table
    const calendarElement = document.querySelector('.calendar');
    const calendarTable = document.createElement('table');
    calendarTable.id = 'calendar';
    calendarElement.innerHTML = '';
    calendarElement.appendChild(calendarTable);

    // First row - Days
    let cRow = document.createElement('tr');
    let cCell = null;

    if (this.isWeekStartsOnMonday) { this.days.push(this.days.shift()); }
    for (const d of this.days) {
      cCell = document.createElement('td');
      cCell.innerHTML = d;
      cRow.appendChild(cCell);
    }
    cRow.classList.add('head');
    calendarTable.appendChild(cRow);

    // Days in Month
    const total = squares.length;
    cRow = document.createElement('tr');
    cRow.classList.add('day');
    for (let i = 0; i < total; i++) {
      cCell = document.createElement('td');
      if (squares[i] === 'b') { cCell.classList.add('blank'); } else {
        cCell.innerHTML = '<div class=\'dd\'>' + squares[i] + '</div>';
        if (this.eventsData[squares[i]]) {
          cCell.innerHTML += '<div class=\'evt\'>' + this.eventsData[squares[i]] + '</div>';
        }
        cCell.addEventListener('click', () => {
          console.log(this);
        });
      }
      cRow.appendChild(cCell);
      if (i !== 0 && (i + 1) % 7 === 0) {
        calendarTable.appendChild(cRow);
        cRow = document.createElement('tr');
        cRow.classList.add('day');
      }
    }
  }
}
