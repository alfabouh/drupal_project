import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { FaqComponent, FaqStrokeComponent, FaqStrokeMainComponent } from "../components/site/faq/faq.component.";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        FaqComponent,
        FaqStrokeComponent,
        FaqStrokeMainComponent
    ],
    providers: []
})
export class FaqModule {
}