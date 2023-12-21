import { Component, Input, ElementRef, Renderer2 } from "@angular/core";
import * as $ from 'jquery';

$(() => {

});

@Component({
    selector: "tariff-block",
    templateUrl: "./tariff-block.component.html",
    styleUrls: ['./tariff-block.component.css' ]
})
export class TariffBlock {
    @Input() upperDesc: string = "";
    @Input() cost: number = 0;
    @Input() points: string[] = [];
    @Input() isMain: boolean = false;

    constructor() {
    }
}

@Component({
    selector: "app-tariffs",
    templateUrl: "./tariffs.component.html",
    styleUrls: ['./tariffs.component.css' ]
})
export class TariffsComponent {
    constructor() {
    }
}