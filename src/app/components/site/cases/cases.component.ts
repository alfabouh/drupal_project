import { Component, Input, ElementRef, Renderer2 } from "@angular/core";
import * as $ from 'jquery';

$(() => {

});

@Component({
    selector: "image-small",
    templateUrl: "./imgs/cases-im-small.component.html",
    styleUrls: ['./imgs/cases-im-small.component.css' ]
})
export class CasesImgSmallComponent {
    @Input() link: string = "/";
    @Input() ImgLink: string = "";
    @Input() title: string = "";
    @Input() date: string = "";
    @Input() description: string = "";

    constructor() {
    }
}

@Component({
    selector: "image-medium",
    templateUrl: "./imgs/cases-im-medium.component.html",
    styleUrls: ['./imgs/cases-im-medium.component.css' ]
})
export class CasesImgMediumComponent {
    @Input() link: string = "/";
    @Input() ImgLink: string = "";
    @Input() title: string = "";
    @Input() date: string = "";

    constructor() {
    }
}

@Component({
    selector: "image-large",
    templateUrl: "./imgs/cases-im-large.component.html",
    styleUrls: ['./imgs/cases-im-large.component.css' ]
})
export class CasesImgLargeComponent {
    @Input() link: string = "/";
    @Input() ImgLink: string = "";
    @Input() title: string = "";

    constructor() {
    }
}

@Component({
    selector: "app-cases",
    templateUrl: "./cases.component.html",
    styleUrls: ['./cases.component.css' ]
})
export class CasesComponent {
    constructor() {
    }
}