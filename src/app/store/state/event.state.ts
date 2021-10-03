import { IEvent } from '../../models/events.model';

export interface IEventState {
    events: IEvent[];
    selectedEvent: IEvent | null;
}

export const initialEventState: IEventState = {
    events: [],
    selectedEvent: null
};