import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "../components/main/main.component";
import { HeaderComponent } from "../components/site/header/header.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    providers: []
})
export class HeadModule {
}