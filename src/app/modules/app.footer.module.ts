import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { FooterComponent, FooterContactComponent } from "../components/site/footer/footer.component";
import { MobXStates } from "../components/site/service/stetemobx";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        FooterComponent,
        FooterContactComponent
    ],
    exports: [
        FooterComponent, 
        FooterContactComponent
    ],
    providers: [MobXStates]
})
export class FooterModule {
}