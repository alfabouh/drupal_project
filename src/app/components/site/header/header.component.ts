import { Component, Input, ElementRef, Renderer2 } from "@angular/core";
import { onrender } from "./render/render.background";
import * as $ from 'jquery';

$(() => {

});

@Component({
    selector: "head-button",
    templateUrl: "./head-button.component.html",
    styleUrls: [ "./head-button.component.css" ]
})
export class HeadButton {
    @Input() innerText: string = "";
    public svgWidth: number = 0;

    constructor(private elementRef: ElementRef) {
    }

    public onMouseOver(): void {
        const buttonWidth: number = this.elementRef.nativeElement.querySelector('button').offsetWidth;
        this.svgWidth = buttonWidth;
    }
}

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.css' ]
})
export class HeaderComponent {
    constructor() {
        onrender();
    }
}

@Component({
    selector: "drupal-desc",
    templateUrl: "./drupal-desc.component.html",
    styleUrls: [ "./drupal-desc.component.css" ]
})
export class DrupalDescription {
    @Input() titleClass: string = "";
    @Input() titleImgLink: string = "";
    @Input() titleText: string = "";
    @Input() innerText: string = "";
}