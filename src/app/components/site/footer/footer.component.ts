import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as $ from 'jquery';
import { Utils } from "src/app/utils/Utils";
import { PopupState } from "../service/popup";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ['./footer.component.css' ]
})
export class FooterComponent {
    constructor() {
    }
}

@Component({
    selector: "footer-contact",
    templateUrl: "./footer-contact.component.html",
    styleUrls: ['./footer-contact.component.css' ]
})
export class FooterContactComponent implements OnInit {
    @ViewChild('status') currStatus: ElementRef | null = null;
    @ViewChild('loading') loading: ElementRef | null = null;

    constructor(private elementRef: ElementRef, public pstate: PopupState) {
    }

    public sendingStatus(): void {
        this.pstate.sending();
        $(this.loading?.nativeElement).show(500);
    }

    public failureStatus(): void {
        this.pstate.failure();
        $(this.currStatus?.nativeElement).html("Ошибка! Попробуйте снова!");
        $(this.currStatus?.nativeElement).show(500);
    }

    public successStatus(): void {
        $(this.currStatus?.nativeElement).html("Успешно отправлена форма!");
        this.pstate.success();
        $("#name").val("");
        $("#mail").val("");
        $("#phone").val("");
        $(this.currStatus?.nativeElement).show(500);
        setTimeout(() => {
            this.pstate.hide();
            this.pstate.popupState = -1;
            $(this.currStatus?.nativeElement).hide(500);
        }, 5000);
        localStorage.clear();
    }

    public send(): void {
        if (this.pstate.popupState !== -1) {
            return;
        }
        console.log("Sending!");
        /*
            Скрипт отправки
        */
       this.sendingStatus();
    }

    public ngOnInit(): void {
        const nRead1: string = Utils.ReadFrom(localStorage, "name");
        const nRead2: string = Utils.ReadFrom(localStorage, "phone");
        const nRead3: string = Utils.ReadFrom(localStorage, "mail");
        if (nRead1 !== null) {
            $("#name").val(nRead1);
        }
        if (nRead2 !== null) {
            $("#phone").val(nRead2);
        }
        if (nRead3 !== null) {
            $("#mail").val(nRead3);
        }
        $("#name").on("input", function() {
            let input: string = $(this).val() as string;
            Utils.WriteIn(localStorage, "name", input);
        });
        $("#mail").on("input", function() {
            let input: string = $(this).val() as string;
            Utils.WriteIn(localStorage, "mail", input);
        });
        $("#phone").on("input", function() {
            let input: string = $(this).val() as string;
            Utils.WriteIn(localStorage, "phone", input);
        });
    }
}