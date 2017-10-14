import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { reducers } from '../reducers/index';
import { ReactiveFormDirective } from './reactive-form.directive';
import { ComponentFixture } from '@angular/core/testing';

import { Submit } from '../actions/form';

@Component({
    template: `<form (ngSubmit)="$event.preventDefault()" reactiveForm></form>`
})
class TestReactiveFormComponent { }

describe('ReactiveFormDirective', () => {

    let component: TestReactiveFormComponent;
    let fixture: ComponentFixture<TestReactiveFormComponent>;
    let formEl: DebugElement;

    let store: Store<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReactiveFormDirective,
                TestReactiveFormComponent
            ],
            imports: [
                StoreModule.forRoot(reducers)
            ]
        });
        fixture = TestBed.createComponent(TestReactiveFormComponent);
        component = fixture.componentInstance;
        formEl = fixture.debugElement.query(By.css('form'));

        store = TestBed.get(Store);

        spyOn(store, 'dispatch').and.callThrough();
    });

    it('should compile', () => {
        fixture.detectChanges();
        expect(fixture).toBeTruthy();
    });

    it('should dispatch new Submit action on form submit', () => {
        fixture.detectChanges();
        formEl.nativeElement.dispatchEvent(new Event('submit'));

        const action = new Submit();

        expect(store.dispatch).toHaveBeenCalledWith(action);
    });

});
