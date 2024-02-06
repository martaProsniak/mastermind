import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from "./game/board/board.component";
import { SettingsComponent } from './game/settings/settings.component';
import { ColorsRowComponent } from './game/colors-row/colors-row.component';
import { ColorDotComponent } from './game/color-dot/color-dot.component';
import { HintComponent } from './game/hint/hint.component';
import { ColorCodeComponent } from './game/color-code/color-code.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent, BoardComponent, SettingsComponent, ColorsRowComponent, ColorDotComponent, HintComponent, ColorCodeComponent, FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
