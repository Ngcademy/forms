import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseFormService } from './services/form.service';
import { FormEffects } from './effects/form.effects';
import { reducers } from './reducers';
import { ReactiveFormDirective } from './directives/reactive-form.directive';

const providers = [];

@NgModule({
    imports: [
        StoreModule.forFeature('forms', reducers),
        EffectsModule.forFeature([FormEffects]),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        BaseFormService
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormDirective
    ],
    declarations: [ReactiveFormDirective],
})
export class NgFormsCommonModule {

    static forRoot(configuredProviders: any[] = []): ModuleWithProviders {
        return {
            ngModule: NgFormsCommonModule,
            providers: [
                ...providers,
                ...configuredProviders
            ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: NgFormsCommonModule) {
        if (parentModule) {
            throw new Error('NgFormsCommonModule already loaded. Import into the root module only.');
        }
    }
}
