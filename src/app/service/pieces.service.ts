import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { PositionMap } from "../map/position.map";
import { PositionsEnum } from "../enum/positions.enum";
import { PiecesNamesEnum } from "../enum/pieces-names.enum";
import { PiecesSpriteMap } from "../map/pieces-sprite.map";
import { BoardPositionsMap } from "../map/board-positions.map";
import { SizesEnum } from "../enum/sizes.enum";
import { PieceModel } from "../model/piece.model";
import { Position } from "../model/position";

@Injectable()
export class PiecesService {

  private context: CanvasRenderingContext2D;
  private image = new Image(SizesEnum.SQUARE_WIDTH, SizesEnum.SQUARE_HEIGHT);
  public spriteSubject = new Subject<boolean>();

  constructor(
    private positionMap: PositionMap,
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
    this.positionMap
      .map
      .forEach((piece: PieceModel, key: PositionsEnum) => {

        this.context.beginPath();

        const coordinates = this.piecesSpriteMap
          .getPieceSpriteCoordinate(piece.name);

        const position = this.boardPositionsMap
          .map.get(key);

        this.context
          .drawImage(
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

        this.context.fill();
        this.context.closePath();
      });
  }

  public drawPiecePossibleMoviments(position: Position, piece: PieceModel): void {

    if (piece.name === PiecesNamesEnum.BLACK_PAWN) {
      this.drawBlackPawnPossibleMoviementes(position)
    }

  }

  private drawBlackPawnPossibleMoviementes(position: Position): void {
    this.drawSquareBorder(position.startX, position.startY * 2 - 25);
    this.drawSquareBorder(position.startX, position.startY * 3 - 50);
  }

  private drawSquareBorder(x, y): void {
    this.context.beginPath();
    this.context.strokeStyle = '#FF0000';
    this.context.lineWidth = 5;
    this.context.strokeRect(x, y, SizesEnum.SQUARE_WIDTH, SizesEnum.SQUARE_HEIGHT);
    this.context.fill();
    this.context.closePath();
  }


}
