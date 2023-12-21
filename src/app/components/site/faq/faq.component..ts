import { Component, Input, ElementRef, Renderer2 } from "@angular/core";
import * as $ from 'jquery';

$(() => {

});

@Component({
    selector: "faq-stroke-main",
    templateUrl: "./faq-stroke-main.component.html",
    styleUrls: ['./faq-stroke-main.component.css' ]
})
export class FaqStrokeMainComponent {
    @Input() title: string = "";
    @Input() description: string = "";
    @Input() num: number = -1;
    
    public getNumber(): string {
        return this.num + ".";
    }

    constructor() {
    }
}

@Component({
    selector: "faq-stroke",
    templateUrl: "./faq-stroke.component.html",
    styleUrls: ['./faq-stroke.component.css' ]
})
export class FaqStrokeComponent {
    @Input() title: string = "";
    @Input() num: number = -1;

    public getNumber(): string {
        return this.num + ".";
    }

    constructor() {
    }
}

@Component({
    selector: "app-faq",
    templateUrl: "./faq.component.html",
    styleUrls: ['./faq.component.css' ]
})
export class FaqComponent {
    constructor() {
    }
}