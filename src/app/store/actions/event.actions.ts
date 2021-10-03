import { Action } from '@ngrx/store';

import { IEvent } from '../../models/events.model';

export enum EEventActions {
    GetEvents = '[Event] Get Events',
    GetEventsSuccess = '[Event] Get Event Success'
}

export class GetEvents implements Action {
    public readonly type = EEventActions.GetEvents;
}

export class GetEventsSuccess implements Action {
    public readonly type = EEventActions.GetEventsSuccess;
    constructor(public payload: IEvent[]) {}
}

export type EventActions = GetEvents | GetEventsSuccess;