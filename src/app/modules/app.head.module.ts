import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent, HeadButton, DrupalDescription } from "../components/site/header/header.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        HeaderComponent,
        HeadButton,
        DrupalDescription
    ],
    providers: []
})
export class HeadModule {
    title = "drupal project";
}