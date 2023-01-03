import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appRef]'
})
export class RefDirecive {
    constructor(public containerRef: ViewContainerRef) {
    }
}