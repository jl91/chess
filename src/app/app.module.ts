import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppService} from './service/app.service';
import {BoardService} from './service/board.service';
import {PiecesService} from './service/pieces.service';
import {PositionMap} from './map/position.map';
import {PiecesSpriteMap} from './map/pieces-sprite.map';
import {BoardPositionsMap} from './map/board-positions.map';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AppService,
    BoardService,
    PiecesService,
    PositionMap,
    PiecesSpriteMap,
    BoardPositionsMap
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
