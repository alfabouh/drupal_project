import { NgModule } from "@angular/core";
import { MainModule } from "./components/site/application/main.module";
import { MainComponent } from "./components/site/application/main.component";


@NgModule({
    imports: [
        MainModule
    ],
    bootstrap: [MainComponent]
})
export class AppModule {
}