import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { CasesComponent } from "../components/site/cases/cases.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        CasesComponent
    ],
    providers: []
})
export class CasesModule {
}