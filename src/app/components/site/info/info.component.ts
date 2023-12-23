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

    constructor(private elementRef: ElementRef) {
    }

    public ngAfterViewInit(): void {
        $("#block2").css({"margin-left": ($("#logo").offset()?.left as number) + "px"});
        $(window).on('resize', e => {
            $("#block2").css({"margin-left": ($("#logo").offset()?.left as number) + "px"});
        });
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