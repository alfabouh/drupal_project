import { Component, Input, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { onrender } from "./render/render.background";
import * as $ from 'jquery';

@Component({
    selector: "button-menu",
    templateUrl: "./button-menu.component.html",
    styleUrls: [ "./button-menu.component.css" ]
})
export class MenuButton {
    @Input() menuSection: string[] = [];
    @Input() sectionLink: string[] = [];

    constructor(private elementRef: ElementRef) {
    }
}

@Component({
    selector: "head-button",
    templateUrl: "./head-button.component.html",
    styleUrls: [ "./head-button.component.css" ]
})
export class HeadButton {
    @ViewChild('buttonMenu') buttonMenu: ElementRef | null = null;
    @Input() innerText: string = "";
    @Input() textClass: string = "button-d mx-3";
    @Input() menuId: string = "";
    public svgWidth: number = 0;

    constructor(private elementRef: ElementRef) {
    }

    public isMenu(): boolean {
        return this.menuId.length != 0;
    }

    public getClassList(): string {
        let textClass: string = this.textClass;
        if (this.isMenu()) {
            textClass += " menub";
        }
        return textClass;
    }

    public ngOnInit(): void {
        if (this.isMenu()) {
            $(this.menuId).hide();
            $(this.elementRef.nativeElement).append($(this.menuId));
            $(this.elementRef.nativeElement).on("mouseenter", (e) => {
                $(this.menuId).css({
                    'position': 'fixed',
                    'left': this.elementRef.nativeElement.getBoundingClientRect().left + 12,
                    'top': this.elementRef.nativeElement.getBoundingClientRect().top + this.elementRef.nativeElement.querySelector('button').offsetHeight
                })
                if (!$(this.menuId).is(":animated")) {
                    $(this.menuId).show(200);
                }
            });
            $(this.elementRef.nativeElement).on("mouseleave", (e) => {
                $(this.menuId).hide(200);
            });
        }
    }

    private calcBounds(): void {
        const buttonWidth: number = this.elementRef.nativeElement.querySelector('button').offsetWidth;
        this.svgWidth = buttonWidth;
    }

    public onMouseOver(): void {
        this.calcBounds();
    }
}

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.css' ]
})
export class HeaderComponent {
    constructor() {
        onrender();
    }
}

@Component({
    selector: "drupal-desc",
    templateUrl: "./drupal-desc.component.html",
    styleUrls: [ "./drupal-desc.component.css" ]
})
export class DrupalDescription {
    @Input() titleClass: string = "";
    @Input() titleImgLink: string = "";
    @Input() titleText: string = "";
    @Input() innerText: string = "";
}