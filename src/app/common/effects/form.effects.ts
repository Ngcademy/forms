import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';

import * as form from '../actions/form';

import { State } from '../reducers/form';

@Injectable()
export class FormEffects {

    @Effect()
    submit$: Observable<Action> = this.actions$
        .ofType(form.SUBMIT)
        .withLatestFrom(
        this.store$.select(state => state.forms)
            .select(state => state.form)
        )
        .map(([action, state]: [Action, State]) => {
            const formGroup = state.formGroup || { valid: false, errors: [] };
            if (formGroup.valid) {
                return new form.SubmitSuccess(formGroup.value);
            } else {
                return new form.SubmitFailed(formGroup.errors);
            }
        });
    // TODO need to hook into an extended http client for handling truly when a request has finished

    constructor(
        private store$: Store<any>,
        private actions$: Actions) { }
}
