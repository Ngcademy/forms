import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Submit } from '../actions/form';

@Directive({
    selector: '[reactiveForm]'
})
export class ReactiveFormDirective implements AfterViewInit, OnDestroy {

    constructor(
        private store$: Store<any>,
        private element: ElementRef) {
        console.log('boom baby!');
    }

    ngAfterViewInit() {
        if (this.element.nativeElement) {
            this.element.nativeElement.addEventListener('submit', (event?: any) => {
                if (event) {
                    event.preventDefault();
                }
                this.store$.dispatch(new Submit);
            });
        }

    }

    ngOnDestroy() {
        this.element.nativeElement.onsubmit = () => { };
    }

}
