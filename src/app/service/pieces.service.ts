import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { InitialPositionMap } from "../map/initial-position.map";
import { PositionsEnum } from "../enum/positions.enum";
import { PiecesNamesEnum } from "../enum/pieces-names.enum";
import { PiecesSpriteMap } from "../map/pieces-sprite.map";
import { BoardPositionsMap } from "../map/board-positions.map";

@Injectable()
export class PiecesService {

  private context: CanvasRenderingContext2D;
  private image = new Image(75, 75);
  private spriteSubject = new Subject<boolean>();

  constructor(
    private initialPositionMap: InitialPositionMap,
    private piecesSpriteMap: PiecesSpriteMap,
    private boardPositionsMap: BoardPositionsMap
  ) {
    this.spriteSubject
      .subscribe((value) => {
        if (value) {
          this.drawPiece();
        }
      });
  }

  public drawPieces(context: CanvasRenderingContext2D): void {
    this.context = context;
    this.loadSprite();
  }

  private loadSprite() {
    this.image.src = '../assets/chess-pieces-sprite.svg';
    this.image.onload = () => this.spriteSubject.next(true);
  }

  private drawPiece(): void {
    this.initialPositionMap
      .map
      .forEach((piecesName: PiecesNamesEnum, key: PositionsEnum) => {

        this.context.beginPath();

        const coordinates = this.piecesSpriteMap.getPieceSpriteCoordinate(piecesName);

        const position = this.boardPositionsMap.map.get(key);
        console.log(position);

        this.context.drawImage(
          this.image,
          coordinates.srcX,
          coordinates.srcY,
          coordinates.srcW,
          coordinates.srcH,
          position.dstX,
          position.dstY,
          coordinates.dstW,
          coordinates.dstH
        );
        this.context.closePath();
        this.context.fill();
      });
  }


}
