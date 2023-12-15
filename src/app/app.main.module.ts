import { NgModule } from "@angular/core";
import { HeadModule } from "./modules/app.head.module";
import { HeaderComponent } from "./components/site/header/header.component";
import { InfoModule } from "./modules/app.info.module";
import { InfoComponent } from "./components/site/info/info.component";
import { SupportModule } from "./modules/app.support.module";
import { SupportComponent } from "./components/site/support/support.component";
import { ExpertiseModule } from "./modules/app.expertise.module";
import { ExpertiseComponent } from "./components/site/expertise/expertise.component";
import { TariffsModule } from "./modules/app.tariffs.module";
import { TariffsComponent } from "./components/site/tariffs/tariffs.component";
import { CasesModule } from "./modules/app.cases.module";
import { CasesComponent } from "./components/site/cases/cases.component";
import { TeamModule } from "./modules/app.team.module";
import { TeamComponent } from "./components/site/team/team.component";
import { FeedbackModule } from "./modules/app.feedback.module";
import { FeedbackComponent } from "./components/site/feedback/feedback.component";
import { ClientsModule } from "./modules/app.clients.module";
import { ClientsComponent } from "./components/site/clients/clients.component";
import { FooterModule } from "./modules/app.footer.module";
import { FooterComponent } from "./components/site/footer/footer.component";
import { ProfessionalsModule } from "./modules/app.professionals.module";
import { ProfessionalsComponent } from "./components/site/professionals/professionals.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { FaqModule } from "./modules/app.faq.module";
import { FaqComponent } from "./components/site/faq/faq.component.";


@NgModule({
    imports: [
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
        FaqModule
    ],
    bootstrap: [
        HeaderComponent,
        InfoComponent,
        SupportComponent,
        ExpertiseComponent,
        TariffsComponent,
        CasesComponent,
        TeamComponent,
        FeedbackComponent,
        ClientsComponent,
        FooterComponent,
        ProfessionalsComponent,
        FaqComponent
    ],
    declarations: [
    ]
})
export class AppModule {
}