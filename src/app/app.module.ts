import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppService } from "./app.service";
import { BoardService } from "./board.service";
import { PiecesService } from "./pieces.service";


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
