import { FormGroup } from '@angular/forms';
import * as form from '../actions/form';

export interface State {
    // The submitted state of the form
    submitted: boolean;
    // The active submission state of the form (tied to network calls)
    submitting: boolean;
    // The form representation
    formGroup?: FormGroup;
}

const initialState: State = {
    submitted: false,
    submitting: false
};

export function reducer(state = initialState, action: form.Actions): State {
    switch (action.type) {
        case form.SETUP:
            return Object.assign({}, state, {
                formGroup: action.payload
            });
        case form.SUBMIT:
            return Object.assign({}, state, {
                submitted: true,
                submitting: true
            });
        case form.SUBMIT_SUCCESS:
        case form.SUBMIT_FAILED:
            return Object.assign({}, state, {
                submitting: false
            });
        case form.RESET:
            const _formGroup = state.formGroup;
            _formGroup.reset();
            return Object.assign({}, state, {
                formGroup: _formGroup
            });
        default: {
            return state;
        }
    }
}

export const hasSubmitted = (state: State) => state.submitted;
export const getFormGroup = (state: State) => (state.formGroup || new FormGroup({}));
export const getFormValue = (state: State) => getFormGroup(state).value;
export const getFormErrors = (state: State) => getFormGroup(state).errors;
export const isFormValid = (state: State) => getFormGroup(state).valid;
export const isSubmitting = (state: State) => state.submitting;
