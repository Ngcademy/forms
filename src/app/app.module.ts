import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgFormsCommonModule } from './common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

export interface State { }

export const reducers: ActionReducerMap<State> = {};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgFormsCommonModule,
        StoreModule.forRoot(reducers, {}),
        EffectsModule.forRoot([])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
