import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { InstructionsComponent } from './rules/instructions.component';
import { HintsComponent } from './rules/hints.component';
import { FlowComponent } from './rules/flow.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: GameComponent },
  {
    path: 'rules',
    component: RulesComponent,
    children: [
      { path: 'instructions', component: InstructionsComponent },
      { path: 'hints', component: HintsComponent },
      { path: 'flow', component: FlowComponent },
      { path: '**', redirectTo: 'instructions' },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
