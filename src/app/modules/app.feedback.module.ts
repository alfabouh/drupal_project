import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { FeedbackBlockComponent, FeedbackComponent } from "../components/site/feedback/feedback.component";
import { SlickCarouselModule } from "ngx-slick-carousel";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SlickCarouselModule
    ],
    declarations: [
        FeedbackComponent,
        FeedbackBlockComponent
    ],
    exports: [FeedbackComponent],
    providers: []
})
export class FeedbackModule {
}