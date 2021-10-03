import { EEventActions, EventActions } from './../actions/event.actions';
import { initialEventState, IEventState } from '../state/event.state';


export const eventReducers = (
    state = initialEventState,
    action: EventActions
): IEventState => {
    switch (action.type){
        case EEventActions.GetEventsSuccess: {
            return {
                ...state,
                events: action.payload
            };  
        }
        default:
            return state;
    } 
};