import { Component } from "@angular/core";
import * as $ from 'jquery';

$(() => {
});

@Component({
    selector: "app-clients",
    templateUrl: "./clients.component.html",
    styleUrls: ['./clients.component.css' ]
})
export class ClientsComponent {
    public carouselConfig: any = {
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        variableWidth: true,
        centerMode: true,
        arrows: false
    };
    public carouselConfig2: any = {
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 800,
        variableWidth: true,
        arrows: false
    };
    constructor() {
    }
}