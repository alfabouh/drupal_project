import { Component, Input, ViewChild } from "@angular/core";
import { SlickCarouselComponent } from "ngx-slick-carousel";

@Component({
    selector: "feedback-block",
    templateUrl: "./feedback-block.component.html",
    styleUrls: ['./feedback-block.component.css' ]
})
export class FeedbackBlockComponent {
    @Input() title: string = "";
    @Input() desc: string = "";
    @Input() ImgLink: string = "";

    constructor() {
    }
}

@Component({
    selector: "app-feedback",
    templateUrl: "./feedback.component.html",
    styleUrls: ['./feedback.component.css' ]
})
export class FeedbackComponent {
    @ViewChild('slickModal') slickModal: SlickCarouselComponent;
    public currentSlide: number = 0;
    public totalSlides: number = 0;

    public carouselConfig: any = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        autoplay: false,
        variableWidth: false,
        centerMode: true,
        fade: true,
        adaptiveHeight: true,
        arrows: false
    };

    public getCurrPage(): string {
        let curr: number = this.currentSlide + 1;
        if (curr <= 9) {
            return "0" + (curr);
        }
        return "" + curr;
    }

    constructor() {
        this.slickModal = new SlickCarouselComponent();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.totalSlides = this.slickModal.slides.length;
        });
    }

    public getAllSlides(): string {
        if (this.totalSlides <= 9) {
            return "0" + (this.totalSlides);
        }
        return "" + this.totalSlides;
    }

    public onChange(event: any) {
        this.currentSlide = event.currentSlide;
    }

    public next(): void {
        this.slickModal.slickNext();
    }

    public prev(): void {
        this.slickModal.slickPrev();
    }
}