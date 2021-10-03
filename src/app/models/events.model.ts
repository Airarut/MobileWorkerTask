export interface IEvent {
    date: Date;
    quantity: number;
    price: number;
    eventTypeName: string;
    eventType: EventTypeEnum;
    isWorkHour: boolean;
    state: StateEnum;
    taskCount: number;
    firstTaskStart: Date;
    lastTaskEnd: Date;
    };

export enum EventTypeEnum {
    hour  = 'hour',
    expense = 'expense',
    additionalHour = 'additionalHour',
}

export enum StateEnum {
    approved  = 'approved',
    rejected = 'rejected',
    none = 'none',
}
