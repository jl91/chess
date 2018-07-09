import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppService } from "./service/app.service";
import { BoardService } from "./service/board.service";
import { PiecesService } from "./service/pieces.service";


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
    PiecesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
