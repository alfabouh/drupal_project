import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { ClientsComponent } from "../components/site/clients/clients.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        ClientsComponent
    ],
    providers: []
})
export class ClientsModule {
}