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
import { GameService } from './game/game.service';
import { EmptyRowComponent } from './game/empty-row/empty-row.component';
import { HintRowComponent } from './game/hint-row/hint-row.component';
import { FormsModule } from '@angular/forms';
import { BackdropComponent } from './backdrop/backdrop.component';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';

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
    ModalComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [GameService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
