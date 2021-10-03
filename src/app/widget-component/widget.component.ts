import { Component, defineInjectable, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { selectEventList } from '../store/selectors/event.selectors';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { GetEvents } from '../store/actions/event.actions';
import { IEvent, StateEnum, EventTypeEnum } from '../models/events.model';
import { CalenderViewInfo } from '../models/calendarViewInfo.model';


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})

export class WidgetComponent implements OnInit {
  
  calenderInfoList: CalenderViewInfo[] = [];
  todayDate = new Date();
  eventList: IEvent[] = [];
  selectedDayEvents: IEvent[] = [];

  containsHourTypeEvents: boolean = false;
  containsExpenseTypeEvents: boolean = false;
  containsAditionalHourTypeEvents: boolean = false;

  hour = EventTypeEnum.hour;
  expense = EventTypeEnum.expense;
  additionalHour = EventTypeEnum.additionalHour;
  selectedDate: Date = new Date(this.todayDate.getTime());


  constructor(
    public datepipe: DatePipe, 
    private _store: Store<IAppState>
    ) {}

  ngOnInit(): void {
    this._store.dispatch(new GetEvents());
    this._store.select(selectEventList).subscribe(events => 
      {
        this.eventList = events;
        this.setCalendarViewInformation();
        this.selectedDayEvents= this.eventList.filter(x => this.isSameDay(x.date, this.todayDate));
        this.containsHourTypeEvents = this.selectedDayEvents.some(x => x.eventType == EventTypeEnum.hour);
        this.containsExpenseTypeEvents = this.selectedDayEvents.some(x => x.eventType == EventTypeEnum.expense);
        this.containsAditionalHourTypeEvents = this.selectedDayEvents.some(x => x.eventType == EventTypeEnum.additionalHour);
      });
  }

  setCalendarViewInformation(): void {
    let calenderInfoList: any[] = [];
    let today: Date = new Date();

    for (let weekday = 0; weekday < 7; weekday++)
    {    
      let dayIterator: Date = new Date(new Date().setDate(today.getDate() - weekday));

      let calenderInfo : CalenderViewInfo = {
        date: dayIterator,
        weekdayCssClass: this.setWeekdayClass(dayIterator),
        monthDayCssClass: this.setMonthDayClass(dayIterator, today),
        totalWorkingHours: this.getTotalWorkingHours(dayIterator),
        eventStatusCssClass: this.setEventStatusClass(dayIterator)
      };

      calenderInfoList[6 - weekday] = calenderInfo;
    }

    this.calenderInfoList = calenderInfoList;
    console.log(this.eventList);
    console.log(this.calenderInfoList);
  }

  isWeekend(day : Date): boolean {
    let weekday = this.datepipe.transform(day, 'EEE');

    if (weekday == 'Sat' || weekday == 'Sun')
      return true;
    else
      return false;
  }

  setWeekdayClass(day: Date): string {
    if(this.isWeekend(day))
      return "margin weekday weekday-weekend calendar-element-position";
    else
      return "margin weekday calendar-element-position";
  }

  setMonthDayClass(day : Date, selectedDate: Date): string{
    let cssClass: string = "monthday margin ";

    if (this.isSameDay(day, selectedDate))
      cssClass += " orange calendar-element-position ";

    if(this.isWeekend(day) && this.isSameDay(day, this.todayDate))
      cssClass += " monthday-weekend monthday-today";
    else if(this.isWeekend(day))
      cssClass += " monthday-weekend";
    else if(this.isSameDay(day, this.todayDate))
      cssClass += " monthday-today";
    
    return cssClass;
  }

  getTotalWorkingHours(date: Date): string{
    let totalMiliseconds: number = 0;

    this.eventList.forEach((event: IEvent) => {
      if (this.isSameDay(date, event.date) && event.isWorkHour)
      {
        totalMiliseconds += event.lastTaskEnd.getTime() - event.firstTaskStart.getTime();
      }
    }); 

    return totalMiliseconds > 0 ? this.milisecToHours(totalMiliseconds) : "-";
  }

  milisecToHours(milisec: number): string{ 
    let h,m, time;
    h = Math.floor(milisec/1000/60/60);
    m = Math.floor((milisec/1000/60/60 - h)*60);

    m < 10 ? m = `0${m}`: m = `${m}`
    h < 10 ? h = `0${h}`: h = `${h}`

    time = h + ":" + m;

    return time;
  }

  setEventStatusClass(date: Date): string{
    let className: string = "dot margin calendar-element-position ";

    let eventsOfTheDay = this.eventList.filter( x =>  
      this.isSameDay(x.date, date) &&
      x.isWorkHour);

    let rejectedEventCount = eventsOfTheDay.filter( x => x.state == StateEnum.rejected).length;
    let approvedEventCount = eventsOfTheDay.filter( x => x.state == StateEnum.approved).length;
    let otherEventCount = eventsOfTheDay.filter( x => x.state != StateEnum.approved && x.state != StateEnum.rejected).length;

    if (rejectedEventCount > 0)
      className += "rejected"
    else if (eventsOfTheDay.length > 0 && approvedEventCount == eventsOfTheDay.length)
      className += "approved"
    else if (otherEventCount > 0)
      className += "other"
    else
      className = "hide margin";

    return className;
  }

  isSameDay(firstDate: Date, secondDate: Date) :boolean{
    return firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate();
  }

  changeSelectedDay(selectedDate: Date){
    this.calenderInfoList.forEach(x => x.monthDayCssClass = this.setMonthDayClass(x.date, selectedDate));
    this.selectedDate = selectedDate;
    this.selectedDayEvents = this.eventList.filter(x => this.isSameDay(x.date, selectedDate));
    this.containsHourTypeEvents = this.selectedDayEvents.some(x => x.eventType == EventTypeEnum.hour);
    this.containsExpenseTypeEvents = this.selectedDayEvents.some(x => x.eventType == EventTypeEnum.expense);
    this.containsAditionalHourTypeEvents = this.selectedDayEvents.some(x => x.eventType == EventTypeEnum.additionalHour);
  }
}