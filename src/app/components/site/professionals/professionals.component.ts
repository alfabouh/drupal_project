import { Component, Input, ElementRef, Renderer2 } from "@angular/core";
import * as $ from 'jquery';

$(() => {

});

@Component({
    selector: "professional-block",
    templateUrl: "./professional-block.component.html",
    styleUrls: ['./professional-block.component.css' ]
})
export class ProfessionalBlockComponent {
    @Input() ImgLink: string = "";
    @Input() title: string = "";
    @Input() description: string = "";

    constructor() {
    }
}

@Component({
    selector: "app-professionals",
    templateUrl: "./professionals.component.html",
    styleUrls: ['./professionals.component.css' ]
})
export class ProfessionalsComponent {
    constructor() {
    }
}