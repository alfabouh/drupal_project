import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent, HeadButton, DrupalDescription, MenuButton, PopUp } from "../components/site/header/header.component";
import { FormsModule } from "@angular/forms";
import { FooterModule } from "./app.footer.module";
import { MobXStates } from "../components/site/service/stetemobx";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        FooterModule
    ],
    declarations: [
        HeaderComponent,
        HeadButton,
        DrupalDescription,
        MenuButton,
        PopUp
    ],
    providers: [MobXStates],
    exports: [HeaderComponent]
})
export class HeadModule {
    title = "drupal project";
}