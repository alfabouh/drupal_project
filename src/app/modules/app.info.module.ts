import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { InfoComponent, InfoDescComponent } from "../components/site/info/info.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        InfoComponent,
        InfoDescComponent
    ],
    providers: []
})
export class InfoModule {
}