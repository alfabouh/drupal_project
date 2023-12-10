import { NgModule } from "@angular/core";
import { HeadModule } from "./modules/app.head.module";
import { AppComponent } from "./components/main/main.component";
import { InfoModule } from "./modules/app.info.module";
import { InfoComponent } from "./components/site/info/info.component";
import { CasesModule } from "./modules/app.cases.module";
import { ClientsModule } from "./modules/app.clients.module";
import { ExpertiseModule } from "./modules/app.expertise.module";
import { FeedbackModule } from "./modules/app.feedback.module";
import { FooterModule } from "./modules/app.footer.module";
import { SupportModule } from "./modules/app.support.module";
import { TariffsModule } from "./modules/app.tariffs.module";
import { TeamModule } from "./modules/app.team.module";
import { CasesComponent } from "./components/site/cases/cases.component";
import { ClientsComponent } from "./components/site/clients/clients.component";
import { ExpertiseComponent } from "./components/site/expertise/expertise.component";
import { FeedbackComponent } from "./components/site/feedback/feedback.component";
import { FooterComponent } from "./components/site/footer/footer.component";
import { SupportComponent } from "./components/site/support/support.component";
import { TariffsComponent } from "./components/site/tariffs/tariffs.component";
import { TeamComponent } from "./components/site/team/team.component";

@NgModule({
    imports: [
        HeadModule,
        InfoModule,
        CasesModule,
        ClientsModule,
        ExpertiseModule,
        FeedbackModule,
        FooterModule,
        SupportModule,
        TariffsModule,
        TeamModule
    ],
    bootstrap: [InfoComponent, AppComponent, CasesComponent, ClientsComponent, ExpertiseComponent, FeedbackComponent, FooterComponent, SupportComponent, TariffsComponent, TeamComponent],
    declarations: [
    ]
})
export class AppModule {
}