import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HeadModule } from "./modules/app.head.module";
import { AppComponent } from "./components/main/main.component";

@NgModule({
    imports: [
        HeadModule
    ],
    bootstrap: [AppComponent],
    declarations: [
    ]
})
export class AppModule {
}