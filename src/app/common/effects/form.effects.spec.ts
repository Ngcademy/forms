import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { FormEffects } from './form.effects';
import { Observable } from 'rxjs/Observable';
import { reducers } from '../reducers/index';
import { Submit, SubmitFailed } from '../actions/form';
import { StoreModule, combineReducers } from '@ngrx/store';

export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}

describe('FormEffects', () => {
    let effects: FormEffects;
    let actions$: TestActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormEffects,
                { provide: Actions, useFactory: getActions }
            ],
            imports: [
                StoreModule.forRoot({
                    'forms': combineReducers(reducers)
                })
            ]
        });

        effects = TestBed.get(FormEffects);
        actions$ = TestBed.get(Actions);

    });

    describe('submit$', () => {

        it('should return a new form.SubmitFailed, with an empty array of form errors if undefined', () => {
            const formErrors = [];
            const action = new Submit();
            const completion = new SubmitFailed(formErrors);

            actions$.stream = hot('-a---', { a: action });
            const response = cold('-a|', { a: formErrors });
            const expected = cold('-b', { b: completion });
            expect(effects.submit$).toBeObservable(expected);
        });

    });
});
