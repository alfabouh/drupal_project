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
export class FooterContactComponent {
    @ViewChild('status') currStatus: ElementRef | null = null;
    @ViewChild('loading') loading: ElementRef | null = null;

    @ViewChild('form_name') form_name: ElementRef | null = null;
    @ViewChild('form_mail') form_mail: ElementRef | null = null;
    @ViewChild('form_phone') form_phone: ElementRef | null = null;
    @ViewChild('form_box') form_box: ElementRef | null = null;
    @ViewChild('form_field2') form_field2: ElementRef | null = null;

    constructor(private elementRef: ElementRef, public pstate: PopupState) {
    }

    public sendingStatus(): void {
        this.pstate.sending();
        $(this.currStatus?.nativeElement).hide(100);
        $(this.loading?.nativeElement).show(500);
    }

    public failureStatus(msg: string): void {
        this.pstate.waiting();
        $(this.loading?.nativeElement).hide(100);
        $(this.currStatus?.nativeElement).html(msg);
        $(this.currStatus?.nativeElement).show(500);
    }

    public successStatus(): void {
        $(this.currStatus?.nativeElement).html("Успешно отправлена форма!");
        $(this.form_name?.nativeElement).val("");
        $(this.form_mail?.nativeElement).val("");
        $(this.form_phone?.nativeElement).val("");
        $(this.loading?.nativeElement).hide(100);
        $(this.currStatus?.nativeElement).show(500);
        setTimeout(() => {
            this.pstate.hide();
            this.pstate.popupState = -1;
            $(this.currStatus?.nativeElement).hide(500);
            this.pstate.waiting();
        }, 5000);
        localStorage.clear();
    }

    public send(): void {
        if (!this.pstate.isWainig()) {
            return;
        }
        console.log("Sending!");
        const mailCnst: string = $(this.form_mail?.nativeElement).val() as string;
        const nameCnst: string = $(this.form_name?.nativeElement).val() as string;
        const phoneCnst: string = $(this.form_phone?.nativeElement).val() as string;

        if (mailCnst.length === 0) {
            this.failureStatus("Не заполнено поле почты!");
            return;
        }

        if (nameCnst.length === 0) {
            this.failureStatus("Не заполнено поле имени!");
            return;
        }

        if (phoneCnst.length === 0) {
            this.failureStatus("Не заполнено поле телефона!");
            return;
        }

        if (!mailCnst.includes(".") || !mailCnst.includes("@")) {
            this.failureStatus("Неправильный Email!");
            return;
        }

        if (!this.form_box?.nativeElement.checked) {
            this.failureStatus("Необходимо пользовательское соглашение!");
            return;
        }

        this.sendingStatus();
        const formData: FormData = new FormData();
        formData.append("Name: ", nameCnst as string);
        formData.append("Email: ", mailCnst as string);
        formData.append("Phone: ", phoneCnst as string);
        formData.append("Message: ", $(this.form_field2?.nativeElement).val() as string);

        let jsonObject: any = {};
        formData.forEach((v, k) => {
          jsonObject[k] = v;
        });
        
        var jsonString = JSON.stringify(jsonObject);

        fetch('https://api.slapform.com/MqD3VM017', {
            method: 'POST',
            body: jsonString,
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(e => {
            if (e.ok) {
                this.successStatus();
            } else {
                this.failureStatus("Не удалось отправить форму!");
            }
        }).catch(err => {
            this.failureStatus("Не удалось отправить форму!");
        });
    }

    public ngAfterViewInit(): void {
        const nRead1: string = Utils.ReadFrom(localStorage, "form_name");
        const nRead2: string = Utils.ReadFrom(localStorage, "form_phone");
        const nRead3: string = Utils.ReadFrom(localStorage, "form_mail");

        if (nRead1 !== null) {
            $(this.form_name?.nativeElement).val(nRead1);
        }
        if (nRead2 !== null) {
            $(this.form_phone?.nativeElement).val(nRead2);
        }
        if (nRead3 !== null) {
            $(this.form_mail?.nativeElement).val(nRead3);
        }
        $(this.form_name?.nativeElement).on("input", function() {
            let input: string = $(this).val() as string;
            Utils.WriteIn(localStorage, "form_name", input);
        });
        $(this.form_mail?.nativeElement).on("input", function() {
            let input: string = $(this).val() as string;
            Utils.WriteIn(localStorage, "form_mail", input);
        });
        $(this.form_phone?.nativeElement).on("input", function() {
            let input: string = $(this).val() as string;
            Utils.WriteIn(localStorage, "form_phone", input);
        });
    }
}