import { Component, Input, ElementRef, Renderer2 } from "@angular/core";
import * as $ from 'jquery';

$(() => {

});

@Component({
    selector: "team-block",
    templateUrl: "./team-block.component.html",
    styleUrls: ['./team-block.component.css' ]
})
export class TeamImageComponent {
    @Input() ImgLink: string = "";
    @Input() title: string = "";
    @Input() description: string = "";

    constructor() {
    }
}

@Component({
    selector: "app-team",
    templateUrl: "./team.component.html",
    styleUrls: ['./team.component.css' ]
})
export class TeamComponent {
    constructor() {
    }
}