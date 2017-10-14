
import * as fromForm from './form';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RootState { }

export interface NgFormState extends RootState {
    form: fromForm.State;
}

export const reducers: any = {
    form: fromForm.reducer
};

export const getNgFormState: any = createFeatureSelector<NgFormState>('forms');

export const getFormState: any = createSelector(getNgFormState, (state: NgFormState) => state.form);
export const hasSubmitted: any = createSelector(getFormState, fromForm.hasSubmitted);
export const getFormGroup: any = createSelector(getFormState, fromForm.getFormGroup);
export const getFormErrors: any = createSelector(getFormState, fromForm.getFormErrors);
export const isFormValid: any = createSelector(getFormState, fromForm.isFormValid);
export const getFormValue: any = createSelector(getFormState, fromForm.getFormValue);
export const isFormSubmitting: any = createSelector(getFormState, fromForm.isSubmitting);
