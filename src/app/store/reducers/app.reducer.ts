import { ActionReducerMap } from "@ngrx/store";

import { routerReducer } from "@ngrx/router-store";
import { IAppState } from "../state/app.state";
import { eventReducers } from "./event.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
    events: eventReducers
};