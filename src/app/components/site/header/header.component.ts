import { Component, Input, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { onrender } from "./render/render.background";
import * as $ from 'jquery';
import { PopupState } from "../service/popup";
import { NavigationEnd, Router } from "@angular/router";

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
    @Input() link: string = ".section_head";
    public svgWidth: number = 0;

    constructor(private elementRef: ElementRef) {
    }

    public scrollTo(): void {
        const to: any = $(this.link).offset()?.top;
        $('html, body').animate({
            scrollTop: to
        }, 320);
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
                    $(this.menuId).show(100);
                }
            });
            $(this.elementRef.nativeElement).on("mouseleave", (e) => {
                $(this.menuId).hide(100);
            });
            $(window).on('scroll', e => {
                $(this.elementRef.nativeElement).trigger("mouseleave");
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
    constructor(private router: Router, public pstate: PopupState){
    }

    public ngOnInit(): void {
        onrender();
    }

    public showPopUp(): void {
        if (this.pstate.popupState === -1) {
            this.router.navigate(['/popup']);
        }
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

@Component({
    selector: "popUp",
    templateUrl: "./popUp/popUp.component.html",
    styleUrls: [ "./popUp/popUp.component.css" ]
})
export class PopUp {
    constructor(private router: Router, private elementRef: ElementRef, public pstate: PopupState) {

    }

    public animationShow(): void {
        let id: any = requestAnimationFrame(this.animationShow.bind(this));
        let currOpacity: number = Number.parseFloat($(this.elementRef.nativeElement).css('opacity'));
        if (currOpacity < 1.0) {
            $(this.elementRef.nativeElement).css({
                'opacity': currOpacity + 0.03
            });
        }
        if (!this.pstate.isShown) {
            this.animationHide();
            cancelAnimationFrame(id);
        }
    }

    public animationHide(): void {
        let id: any = requestAnimationFrame(this.animationHide.bind(this));
        let currOpacity: number = Number.parseFloat($(this.elementRef.nativeElement).css('opacity'));
        if (currOpacity > 0.0) {
            $(this.elementRef.nativeElement).css({
                'opacity': currOpacity - 0.03
            });
        } else {
            $(this.elementRef.nativeElement).css({
                'display': 'none'
            });
            cancelAnimationFrame(id);
            this.router.navigate(['/']);
        }
    }


    public ngOnInit(): void {
        this.pstate.show();
        $(this.elementRef.nativeElement).css({
            'display': 'block',
            'opacity': '0'
        });
        this.animationShow();
    }
}