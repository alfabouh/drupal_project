import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { ExpertiseComponent, ExpertiseDescComponent } from "../components/site/expertise/expertise.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        ExpertiseComponent,
        ExpertiseDescComponent
    ],
    exports: [ExpertiseComponent],
    providers: []
})
export class ExpertiseModule {
}