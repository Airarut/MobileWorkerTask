import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventTypeEnum, IEvent, StateEnum } from '../models/events.model';

@Injectable()
export class EventService {
  
    eventList: IEvent[] = [
        {
            date: new Date("2021-10-01"),
            quantity: 2,
            price: 23,
            eventTypeName: 'meeting',
            eventType: EventTypeEnum.hour,
            isWorkHour: true,
            state: StateEnum.approved,
            taskCount: 5,
            firstTaskStart: new Date("2021-10-02 8:00:00"),
            lastTaskEnd: new Date("2021-10-02 10:00:00")
        },
        {
            date: new Date("2021-09-29"),
            quantity: 3,
            price: 35,
            eventTypeName: 'testing',
            eventType: EventTypeEnum.expense,
            isWorkHour: true,
            state: StateEnum.rejected,
            taskCount: 3,
            firstTaskStart: new Date("2021-09-29 8:00:00"),
            lastTaskEnd: new Date("2021-09-29 16:00:00")
        },
        {
            date: new Date("2021-09-30"),
            quantity: 3,
            price: 35,
            eventTypeName: 'coding',
            eventType: EventTypeEnum.hour,
            isWorkHour: true,
            state: StateEnum.none,
            taskCount: 3,
            firstTaskStart: new Date("2021-09-30 8:00:00"),
            lastTaskEnd: new Date("2021-09-30 15:00:00")
        },
        {
            date: new Date("2021-10-01"),
            quantity: 3,
            price: 35,
            eventTypeName: 'meeting',
            eventType: EventTypeEnum.additionalHour,
            isWorkHour: true,
            state: StateEnum.approved,
            taskCount: 3,
            firstTaskStart: new Date("2021-10-02 13:00:00"),
            lastTaskEnd: new Date("2021-10-02 15:00:00")
        },
        {
            date: new Date("2021-09-30"),
            quantity: 3,
            price: 35,
            eventTypeName: 'meeting',
            eventType: EventTypeEnum.additionalHour,
            isWorkHour: true,
            state: StateEnum.rejected,
            taskCount: 3,
            firstTaskStart: new Date("2021-09-30 13:00:00"),
            lastTaskEnd: new Date("2021-09-30 15:00:00")
        },
        {
            date: new Date("2021-09-30"),
            quantity: 3,
            price: 35,
            eventTypeName: 'meeting',
            eventType: EventTypeEnum.additionalHour,
            isWorkHour: true,
            state: StateEnum.rejected,
            taskCount: 3,
            firstTaskStart: new Date("2021-09-30 13:00:00"),
            lastTaskEnd: new Date("2021-09-30 15:00:00")
        },
        {
            date: new Date("2021-09-30"),
            quantity: 3,
            price: 35,
            eventTypeName: 'meeting',
            eventType: EventTypeEnum.additionalHour,
            isWorkHour: true,
            state: StateEnum.rejected,
            taskCount: 3,
            firstTaskStart: new Date("2021-09-30 13:00:00"),
            lastTaskEnd: new Date("2021-09-30 15:00:00")
        },
        {
            date: new Date("2021-09-30"),
            quantity: 3,
            price: 35,
            eventTypeName: 'meeting',
            eventType: EventTypeEnum.additionalHour,
            isWorkHour: true,
            state: StateEnum.rejected,
            taskCount: 3,
            firstTaskStart: new Date("2021-09-30 13:00:00"),
            lastTaskEnd: new Date("2021-09-30 15:00:00")
        }

    ];
    
    constructor(public http: HttpClient) {
    }
  
    public GetEvents(): Observable<IEvent[]> {
        //   return this.http.get<IEvent[]>("api/events");

        return new Observable((subscriber) => {
            setTimeout(()=>{
                subscriber.next(this.eventList);
                subscriber.complete();
            }, 100);
        });
    }
  
  }
