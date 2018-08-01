import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {PositionMap} from '../map/position.map';
import {PositionsEnum} from '../enum/positions.enum';
import {PiecesNamesEnum} from '../enum/pieces-names.enum';
import {PiecesSpriteMap} from '../map/pieces-sprite.map';
import {BoardPositionsMap} from '../map/board-positions.map';
import {SizesEnum} from '../enum/sizes.enum';
import {PieceModel} from '../model/piece.model';
import {Position} from '../model/position';
import {BishopCoordinatesEnum} from '../enum/bishop-coordinates.enum';

@Injectable()
export class PiecesService {

  public spriteSubject = new Subject<boolean>();
  private context: CanvasRenderingContext2D;
  private image = new Image(SizesEnum.SQUARE_WIDTH, SizesEnum.SQUARE_HEIGHT);

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

  public drawPiecePossibleMovements(position: Position, piece: PieceModel): void {

    if (piece.name === PiecesNamesEnum.BLACK_PAWN) {
      this.drawBlackPawnPossibleMovements(position, piece);
    }

    if (piece.name === PiecesNamesEnum.BLACK_ROOK) {
      this.drawBlackRookPossibleMovements(position, piece);
    }

    if (piece.name === PiecesNamesEnum.BLACK_KNIGHT) {
      this.drawBlackKnightPossibleMovements(position, piece);
    }

    if (piece.name === PiecesNamesEnum.BLACK_BISHOP) {
      this.drawBlackBishopPossibleMovements(position, piece);
    }

    if (piece.name === PiecesNamesEnum.BLACK_QUEEN) {
      this.drawBlackQueenPossibleMovements(position, piece);
    }

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

  private drawBlackPawnPossibleMovements(position: Position, piece: PieceModel): void {

    this.drawSquareBorder(position.startX, (position.startY + SizesEnum.SQUARE_HEIGHT));

    if (this.isFirstMovement(position, piece)) {
      this.drawSquareBorder(position.startX, (position.startY + SizesEnum.SQUARE_HEIGHT * 2));
    }
  }

  private drawBlackRookPossibleMovements(position: Position, piece: PieceModel): void {

    // top movements
    this.drawRookSquares(position, true, false);

    // right movements
    this.drawRookSquares(position, false, true);

    // bottom movements
    this.drawRookSquares(position, true, true);

    // left movements
    this.drawRookSquares(position, false, false);

  }

  private drawRookSquares(position: Position, isVertical: boolean, isPositive: boolean): void {
    let x = 0;
    let y = 0;
    for (let i = 0; i < 7; i++) {

      if (isVertical) {
        x = position.startX;
        y = position.startY + SizesEnum.SQUARE_HEIGHT * (isPositive ? (i + 1) : -(i + 1));
      } else {
        x = position.startX + SizesEnum.SQUARE_HEIGHT * (isPositive ? (i + 1) : -(i + 1));
        y = position.startY;
      }

      if (!this.drawPiecePossibleMovementesByCoordinates(x, y)) {
        break;
      }
    }
  }

  private drawBlackKnightPossibleMovements(position: Position, piece: PieceModel): void {
  }

  private drawBlackBishopPossibleMovements(position: Position, piece: PieceModel): void {

    // top movements
    this.drawBlackBishopSquares(position, BishopCoordinatesEnum.TOP_LEFT);

    // right movements
    this.drawBlackBishopSquares(position, BishopCoordinatesEnum.TOP_RIGHT);

    // bottom movements
    this.drawBlackBishopSquares(position, BishopCoordinatesEnum.BOTTOM_RIGHT);
    //
    // left movements
    this.drawBlackBishopSquares(position, BishopCoordinatesEnum.BOTTOM_LEFT);

  }

  private drawBlackQueenPossibleMovements(position: Position, piece: PieceModel): void {
    this.drawBlackBishopPossibleMovements(position, piece);
    this.drawBlackRookPossibleMovements(position, piece);
  }

  private drawBlackBishopSquares(position: Position, location: BishopCoordinatesEnum): void {
    let x = 0;
    let y = 0;

    for (let i = 0; i < 7; i++) {

      if (location === BishopCoordinatesEnum.TOP_LEFT) {
        x = position.startX - SizesEnum.SQUARE_HEIGHT * (i + 1);
        y = position.startY - SizesEnum.SQUARE_HEIGHT * (i + 1);
      }

      if (location === BishopCoordinatesEnum.TOP_RIGHT) {
        x = position.startX + SizesEnum.SQUARE_HEIGHT * (i + 1);
        y = position.startY - SizesEnum.SQUARE_HEIGHT * (i + 1);
      }

      if (location === BishopCoordinatesEnum.BOTTOM_RIGHT) {
        x = position.startX - SizesEnum.SQUARE_HEIGHT * -(i + 1);
        y = position.startY + SizesEnum.SQUARE_HEIGHT * (i + 1);
      }

      if (location === BishopCoordinatesEnum.BOTTOM_LEFT) {
        x = position.startX + SizesEnum.SQUARE_HEIGHT * -(i + 1);
        y = position.startY + SizesEnum.SQUARE_HEIGHT * (i + 1);
      }

      if (!this.drawPiecePossibleMovementesByCoordinates(x, y)) {
        break;
      }

    }
  }

  private drawPiecePossibleMovementesByCoordinates(x, y): boolean {
    const positionByCoordinate = this.boardPositionsMap.getPositionByCoordinates(x, y);

    if (positionByCoordinate === undefined) {
      return false;
    }

    this.drawSquareBorder(x, y);
    return true;
  }

  private isFirstMovement(position: Position, piece: PieceModel): boolean {
    return piece.position === position.coordinate;
  }

  private drawSquareBorder(x, y): void {
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(255, 0, 0)';
    this.context.lineWidth = 5;
    this.context.strokeRect(x, y, SizesEnum.SQUARE_WIDTH, SizesEnum.SQUARE_HEIGHT);
    this.context.fill();
    this.context.closePath();
  }

}
