import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { CasesComponent, CasesImgLargeComponent, CasesImgMediumComponent, CasesImgSmallComponent } from "../components/site/cases/cases.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        CasesComponent,
        CasesImgSmallComponent,
        CasesImgMediumComponent,
        CasesImgLargeComponent
    ],
    providers: []
})
export class CasesModule {
}