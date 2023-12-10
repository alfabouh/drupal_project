import { Component, Input, ElementRef, Renderer2 } from "@angular/core";
import * as $ from 'jquery';

$(() => {

});

@Component({
    selector: "app-info",
    templateUrl: "./info.component.html",
    styleUrls: ['./info.component.css' ]
})
export class InfoComponent {
    constructor() {
    }
}

@Component({
    selector: "block-desc",
    templateUrl: "./info-desc.component.html",
    styleUrls: ['./info-desc.component.css' ]
})
export class InfoDescComponent {
    @Input() ImgLink: string = "";
    @Input() innerText: string = "";
    
    constructor() {
    }
}