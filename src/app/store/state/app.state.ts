import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { IEventState, initialEventState } from './event.state';

export interface IAppState {
    router?: RouterReducerState;
    events: IEventState;
}

export const initialAppState: IAppState = {
    events: initialEventState,
}

export function getInitialState(): IAppState {
    return initialAppState;
}