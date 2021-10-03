import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { EEventActions, GetEvents, GetEventsSuccess } from "../actions/event.actions";
import { IAppState } from "../state/app.state";
import { switchMap } from 'rxjs/operators';
import { IEvent } from "src/app/models/events.model";
import { Store } from "@ngrx/store";
import { EventService } from '../../services/event.service'


@Injectable()
export class EventEffects{
    @Effect()
    getEvents$ = this._actions$.pipe(
            ofType<GetEvents>(EEventActions.GetEvents),
            switchMap(() => this._eventService.GetEvents()),
            switchMap((response: IEvent[]) => of(new GetEventsSuccess(response)))
    );
    constructor(
        private _eventService: EventService,
        private _actions$: Actions,
        private _store: Store<IAppState>
    ) {}
}