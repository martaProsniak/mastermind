import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { GameComponent } from './game/game.component';
import { InstructionsComponent } from './rules/instructions.component';
import { HintsComponent } from './rules/hints.component';
import { FlowComponent } from './rules/flow.component';
import { GameplayComponent } from './home/gameplay.component';
import { GameHistoryComponent } from './home/history.component';

const appRoutes: Routes = [
  { path: '', component: GameComponent },
  {
    path: 'about',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
    children: [
      { path: 'gameplay', component: GameplayComponent },
      { path: 'history', component: GameHistoryComponent },
      { path: '**', redirectTo: 'gameplay' },
    ],
  },
  {
    path: 'rules',
    loadComponent: () => import('./rules/rules.component').then((m) => m.RulesComponent),
    children: [
      { path: 'board', component: InstructionsComponent },
      { path: 'hints', component: HintsComponent },
      { path: 'flow', component: FlowComponent },
      { path: '**', redirectTo: 'board' },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
