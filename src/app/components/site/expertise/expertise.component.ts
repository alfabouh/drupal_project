import { Component, Input, ElementRef, Renderer2 } from "@angular/core";
import * as $ from 'jquery';

$(() => {

});

@Component({
    selector: "expertise-desc",
    templateUrl: "./expertise-desc.component.html",
    styleUrls: ['./expertise-desc.component.css' ]
})
export class ExpertiseDescComponent {
    @Input() innerText: string = "";
    constructor() {
    }
}

@Component({
    selector: "app-expertise",
    templateUrl: "./expertise.component.html",
    styleUrls: ['./expertise.component.css' ]
})
export class ExpertiseComponent {
    constructor() {
    }
}