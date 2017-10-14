import { Action } from '@ngrx/store';
import { FormGroup } from '@angular/forms';

export const SETUP = '[Forms] Setup';

export const SUBMIT = '[Forms] Submit';
export const SUBMIT_SUCCESS = '[Forms] Submit Success';
export const SUBMIT_FAILED = '[Forms] Submit Failed';

export const RESET = '[Forms] Reset';

export class Setup implements Action {
    readonly type = SETUP;
    constructor(public payload?: FormGroup) { }
}

export class Submit implements Action {
    readonly type = SUBMIT;
    payload = null;
}

export class SubmitSuccess implements Action {
    readonly type = SUBMIT_SUCCESS;
    constructor(public payload: any) { }
}

export class SubmitFailed implements Action {
    readonly type = SUBMIT_FAILED;
    constructor(public payload?: any) { }
}

export class Reset implements Action {
    readonly type = RESET;
    payload = null;
}


export type Actions
    = Setup
    | Submit
    | SubmitSuccess
    | SubmitFailed
    | Reset;
