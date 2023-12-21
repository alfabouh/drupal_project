import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { TeamComponent, TeamImageComponent } from "../components/site/team/team.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        TeamComponent,
        TeamImageComponent
    ],
    exports: [TeamComponent],
    providers: []
})
export class TeamModule {
}