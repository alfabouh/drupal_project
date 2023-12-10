import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { TeamComponent } from "../components/site/team/team.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        TeamComponent
    ],
    providers: []
})
export class TeamModule {
}