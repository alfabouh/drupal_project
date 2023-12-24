import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MainComponent } from "./main.component";
import { MobXStates } from "../service/stetemobx";
import { RouterOutlet } from "@angular/router";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { CasesModule } from "src/app/modules/app.cases.module";
import { ClientsModule } from "src/app/modules/app.clients.module";
import { ExpertiseModule } from "src/app/modules/app.expertise.module";
import { FaqModule } from "src/app/modules/app.faq.module";
import { FeedbackModule } from "src/app/modules/app.feedback.module";
import { HeadModule } from "src/app/modules/app.head.module";
import { InfoModule } from "src/app/modules/app.info.module";
import { ProfessionalsModule } from "src/app/modules/app.professionals.module";
import { SupportModule } from "src/app/modules/app.support.module";
import { TariffsModule } from "src/app/modules/app.tariffs.module";
import { TeamModule } from "src/app/modules/app.team.module";
import { FooterModule } from "src/app/modules/app.footer.module";
import { SiteRoutingModule } from "./routing/site.routing.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HeadModule,
        InfoModule,
        SupportModule,
        ExpertiseModule,
        TariffsModule,
        CasesModule,
        TeamModule,
        FeedbackModule,
        ClientsModule,
        FooterModule,
        ProfessionalsModule,
        SlickCarouselModule,
        FaqModule,
        SiteRoutingModule,
        RouterOutlet
    ],
    declarations: [MainComponent],
    providers: [MobXStates]
})
export class MainModule {
}