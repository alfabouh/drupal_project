import { Component, Input, ElementRef, Renderer2 } from "@angular/core";
import * as $ from 'jquery';

$(() => {

});

@Component({
    selector: "support-block",
    templateUrl: "./support-block.component.html",
    styleUrls: ['./support-block.component.css' ]
})
export class SupportInfoBlock {
    @Input() ImgLink: string = "";
    @Input() titleText: string = "";
    @Input() innerText: string = "";
    @Input() innerId: number = -1;

    public getImgUrl(): string {
        return "url(" + this.ImgLink + ")";
    }

    public getId(): string {
        return "0" + this.innerId + ".";
    }

    constructor() {
    }
}

@Component({
    selector: "app-support",
    templateUrl: "./support.component.html",
    styleUrls: ['./support.component.css' ]
})
export class SupportComponent {
    constructor() {
    }
}