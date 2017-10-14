import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import * as forms from './common/actions/form';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { getFormGroup, hasSubmitted, BaseFormService } from './common/index';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    formGroup$: Observable<FormGroup>;

    hasSubmitted$: Observable<boolean>;

    constructor(
        private store$: Store<any>,
        private actions$: Actions,
        private formService: BaseFormService,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.store$.dispatch(new forms.Setup(this.fb.group({
            firstName: [null, Validators.required],
            lastName: []
        })));

        this.formGroup$ = this.store$.select(getFormGroup);
        this.hasSubmitted$ = this.store$.select(hasSubmitted);

        // Example demonstration of hooking onto the form submission success event
        this.formService
            .onSubmitSuccess$
            .take(1)
            .do(formValue => {
                window.alert(`Submit Valid: ${JSON.stringify(formValue)}`);
            })
            .subscribe();
    }


}
