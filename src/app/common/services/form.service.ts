import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as form from '../actions/form';

@Injectable()
export class BaseFormService {

    constructor(private actions$: Actions) { }

    /**
     * Event hook for when the form has submitted successfully (valid form submission)
     */
    get onSubmitSuccess$(): Actions<any> {
        return this.actions$.ofType(form.SUBMIT_SUCCESS);
    }

    /**
     * Event hook for when the form submission attempt has failed due to validation errors
     */
    get onSubmitFailed$(): Observable<any> {
        return this.actions$.ofType(form.SUBMIT_FAILED);
    }

}
