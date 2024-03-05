import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game/board/board.component';
import { SettingsComponent } from './game/settings/settings.component';
import { ColorDotComponent } from './game/color-dot/color-dot.component';
import { ColorCodeComponent } from './game/color-code/color-code.component';
import { FooterComponent } from './footer/footer.component';
import { AvailableColorsComponent } from './game/available-colors/available-colors.component';
import { EmptyRowComponent } from './game/empty-row/empty-row.component';
import { HintRowComponent } from './game/hint-row/hint-row.component';
import { FormsModule } from '@angular/forms';
import { BackdropComponent } from './UI/backdrop/backdrop.component';
import { ModalComponent } from './UI/modal/modal.component';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { HintsComponent } from './rules/hints.component';
import { InstructionsComponent } from './rules/instructions.component';
import { FlowComponent } from './rules/flow.component';
import { GameHistoryComponent } from './home/history.component';
import { GameplayComponent } from './home/gameplay.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    BoardComponent,
    SettingsComponent,
    ColorDotComponent,
    ColorCodeComponent,
    FooterComponent,
    AvailableColorsComponent,
    EmptyRowComponent,
    HintRowComponent,
    BackdropComponent,
    ModalComponent,
    HomeComponent,
    RulesComponent,
    NavigationComponent,
    HintsComponent,
    InstructionsComponent,
    FlowComponent,
    GameHistoryComponent,
    GameplayComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
