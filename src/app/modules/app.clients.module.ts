import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { ClientsComponent } from "../components/site/clients/clients.component";
import { SlickCarouselModule } from "ngx-slick-carousel";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SlickCarouselModule
    ],
    declarations: [
        ClientsComponent
    ],
    providers: []
})
export class ClientsModule {
}