import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { FeedbackComponent } from "../components/site/feedback/feedback.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        FeedbackComponent
    ],
    providers: []
})
export class FeedbackModule {
}