import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { ProfessionalBlockComponent, ProfessionalsComponent } from "../components/site/professionals/professionals.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        ProfessionalsComponent,
        ProfessionalBlockComponent
    ],
    exports: [ProfessionalsComponent],
    providers: []
})
export class ProfessionalsModule {
}