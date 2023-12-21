import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { TariffBlock, TariffsComponent } from "../components/site/tariffs/tariffs.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        TariffsComponent,
        TariffBlock
    ],
    exports: [TariffsComponent],
    providers: []
})
export class TariffsModule {
}