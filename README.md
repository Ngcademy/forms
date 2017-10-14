# Ngcademy Forms

Standardized approach to reactive Angular forms. Manages the repetitive nature of setting up new forms in Angular with the powerful workflow of RxJS.

**_Note_**: This package has not been officially released and the documentation (imports, etc.) will not reflect the final implementation.

## Getting Started

### Prerequisites

1. Use Ngrx4 dependencies (store, effects)
2. Root state bootstrapped in `AppModule`
3. Use `FormGroup` for form declarations.

### Usage

Import the `NgFormsCommonModule` into your main `AppModule`.

```
imports: [
    NgFormsCommonModule
]
```


Bind the `reactiveForm` directive to an existing `form` element to leverage the auto dispatching of the submission actions. Will automatically dispatch `Submit` into effect listener when the form is submitted naturally.

```html
<form reactiveForm></form>
```

Initialize the `FormGroup` reference by dispatching the `Setup` action.

```ts
import { Store } from '@ngrx/store';
import * as forms from './common/actions/form';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { getFormGroup } from './common/index';
...

constructor(
    private store$: Store<any>,
    private fb: FormBuilder) {}

    formGroup$: Observable<any>;

    ngOnInit() {
        this.store$.dispatch(new forms.Setup(this.fb.group({
            firstName: [null, Validators.required],
            lastName: []
        })));
        this.formGroup$ = this.store$.select(getFormGroup);
    }
```

Bind the `formGroup$` Observable to the form binding needed for reactive forms.

```html
<form [formGroup]="formGroup$ | async" reactiveForm></form>
```

# RxJS Hooks

This package contains a variety of convenient selectors to digest segments of form state quickly.

|Hook|Description|
|---|---|
|`hasSubmitted`|Flag determines if the form has been submitted by the user.|
|`getFormGroup`|Returns a reference to the Angular `FormGroup` declaration.|
|`getFormErrors`|Pointer reference to quickly return back the form errors.|
|`isFormValid`|Pointer reference to quickly return back the validity of the form.|
|`getFormValue`|Pointer reference to quickly return back the form snapshot value.|
`isFormSubmitting`|_In Progress_: Determines if the form submission has completed the API cycle round.|

## Effect Binding

This package emits two exposed effect actions in respect to the overall submission validity.

#### Action Types

|Type|Description|
|---|---|
|`[Forms] Submit Success`|The form passed validation requirements and has been submitted by the user.|
|`[Forms] Submit Failed`|The form failed validation requirements by the user after a submission attempt.|

The action types are respectably available through the barrel file `common/index` as `SUBMIT_SUCCESS` and `SUBMIT_FAILED`.


#### Example Usage

In your own application, you can hook and respond to the effects that are dispatched from the underlying package.

```
@Effect()
exampleFormSave$: Observable<Action> = this.actions$
    .ofType(form.SUBMIT_SUCCESS)
    .map(toPayload)
    .switchMap(formData => {
        return this.myService.saveData(formData);
    });
```


## Road Map
- [ ] Production Release of Forms Package
- [ ] Namespaced Form Declarations (support for multiple form instances at same time)
- [ ] TBD

## Contributors

[<img alt="Sean perkins" src="https://avatars1.githubusercontent.com/u/13732623?v=3&s=117" width="117">](https://github.com/sean-perkins) |
:---:
|[Sean Perkins](https://github.com/sean-perkins)|
