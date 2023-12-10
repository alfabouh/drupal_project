import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { FooterComponent } from "../components/site/footer/footer.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        FooterComponent
    ],
    providers: []
})
export class FooterModule {
}