import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game/board/board.component';
import { SettingsComponent } from './game/settings/settings.component';
import { ColorDotComponent } from './game/color-dot/color-dot.component';
import { HintComponent } from './game/hint/hint.component';
import { ColorCodeComponent } from './game/color-code/color-code.component';
import { FooterComponent } from './footer/footer.component';
import { AvailableColorsComponent } from './game/available-colors/available-colors.component';
import { GameService } from './game/game.service';
import { EmptyRowComponent } from './game/empty-row/empty-row.component';
import { HintRowComponent } from './game/hint-row/hint-row.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    BoardComponent,
    SettingsComponent,
    ColorDotComponent,
    HintComponent,
    ColorCodeComponent,
    FooterComponent,
    AvailableColorsComponent,
    EmptyRowComponent,
    HintRowComponent,
  ],
  imports: [BrowserModule],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
