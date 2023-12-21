import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { FooterComponent, FooterContactComponent } from "../components/site/footer/footer.component";
import { PopupState } from "../components/site/service/popup";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        FooterComponent,
        FooterContactComponent
    ],
    exports: [
        FooterComponent, 
        FooterContactComponent
    ],
    providers: [PopupState]
})
export class FooterModule {
}