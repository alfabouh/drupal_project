import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainComponent } from "../main.component";
import { PopUp } from "../../header/header.component";

const routes: Routes = [
    { path: 'popup', component: PopUp }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule {}