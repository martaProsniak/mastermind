import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GameComponent} from "./game/game.component";
import {HomeComponent} from "./home/home.component";
import {RulesComponent} from "./rules/rules.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'game', component: GameComponent},
  {path: 'rules', component: RulesComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
