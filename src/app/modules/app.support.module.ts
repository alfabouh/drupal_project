import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { SupportComponent, SupportInfoBlock } from "../components/site/support/support.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        SupportComponent,
        SupportInfoBlock
    ],
    providers: []
})
export class SupportModule {
}