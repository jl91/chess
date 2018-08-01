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
import {KnightEnum} from '../enum/knight.enum';

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

    if (this.isBlackPawn(piece)) {
      this.drawBlackPawnPossibleMovements(position, piece);
    }

    if (this.isRook(piece)) {
      this.drawRookPossibleMovements(position, piece);
    }

    if (this.isKnight(piece)) {
      this.drawKnightPossibleMovements(position, piece);
    }

    if (this.isBishop(piece)) {
      this.drawBishopPossibleMovements(position);
    }

    if (this.isQueen(piece)) {
      this.drawQueenPossibleMovements(position, piece);
    }
  }

  private isBlackPawn(piece): boolean {
    return piece.name === PiecesNamesEnum.BLACK_PAWN;
  }

  private isRook(piece: PieceModel): boolean {
    return piece.name === PiecesNamesEnum.BLACK_ROOK || piece.name === PiecesNamesEnum.WHITE_ROOK;
  }

  private isKnight(piece: PieceModel): boolean {
    return piece.name === PiecesNamesEnum.BLACK_KNIGHT || piece.name === PiecesNamesEnum.WHITE_KNIGHT;
  }

  private isBishop(piece: PieceModel): boolean {
    return piece.name === PiecesNamesEnum.BLACK_BISHOP || piece.name === PiecesNamesEnum.WHITE_BISHOP;
  }

  private isQueen(piece: PieceModel): boolean {
    return piece.name === PiecesNamesEnum.BLACK_QUEEN || piece.name === PiecesNamesEnum.WHITE_QUEEN;
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

    if (this.isPawnFirstMovement(position, piece)) {
      this.drawSquareBorder(position.startX, (position.startY + SizesEnum.SQUARE_HEIGHT * 2));
    }
  }

  private drawRookPossibleMovements(position: Position, piece: PieceModel): void {

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

      if (!this.drawPiecePossibleMovementsByCoordinates(x, y)) {
        break;
      }
    }
  }

  private drawKnightPossibleMovements(position: Position, piece: PieceModel): void {

    // TOP_LEFT = 'top-left',
    // TOP_RIGHT = 'top-right',
    //
    // RIGHT_TOP = 'right-top',
    // RIGHT_BOTTOM = 'right-bottom',
    //
    // BOTTOM_LEFT = 'bottom-left',
    // BOTTOM_RIGHT = 'bottom-right',
    //
    // LEFT_TOP = 'left-top',
    // LEFT_BOTTOM = 'left-bottom'

    // TOP_LEFT
    this.drawKnightSquares(position, KnightEnum.TOP_LEFT);

    // TOP_RIGHT
    this.drawKnightSquares(position, KnightEnum.TOP_RIGHT);

    // RIGHT_TOP
    this.drawKnightSquares(position, KnightEnum.RIGHT_TOP);

    // RIGHT_BOTTOM
    this.drawKnightSquares(position, KnightEnum.RIGHT_BOTTOM);

  }

  private drawKnightSquares(position: Position, location: KnightEnum): void {

    if (!this.canDrawLocation(position, location)) {
      return;
    }


    let x = 0;
    let y = 0;

    for (let i = 0; i < 2; i++) {

      if (
        location === KnightEnum.TOP_LEFT ||
        location === KnightEnum.TOP_RIGHT
      ) {
        x = position.startX;
        y = position.startY - SizesEnum.SQUARE_HEIGHT * (i + 1);
      }

      if (
        location === KnightEnum.RIGHT_TOP ||
        location === KnightEnum.RIGHT_BOTTOM
      ) {
        x = position.startX;
        y = position.startY - SizesEnum.SQUARE_HEIGHT * (i + 1);
      }

      this.drawPiecePossibleMovementsByCoordinates(x, y);
    }

    if (location === KnightEnum.TOP_LEFT) {
      x -= SizesEnum.SQUARE_HEIGHT;
    }

    if (location === KnightEnum.TOP_RIGHT) {
      x += SizesEnum.SQUARE_HEIGHT;
    }

    this.drawPiecePossibleMovementsByCoordinates(x, y);

  }

  private canDrawLocation(position: Position, location: KnightEnum): boolean {

    let x = 0;
    let y = 0;

    if (location === KnightEnum.TOP_LEFT) {
      x = position.startX - SizesEnum.SQUARE_HEIGHT;
      y = position.startY - SizesEnum.SQUARE_HEIGHT * 2;
    }

    if (location === KnightEnum.TOP_RIGHT) {
      x = position.startX + SizesEnum.SQUARE_HEIGHT;
      y = position.startY - SizesEnum.SQUARE_HEIGHT * 2;
    }

    const newPosition = this.boardPositionsMap.getPositionByCoordinates(x, y);

    if (newPosition === undefined) {
      return false;
    }

    return true;
  }

  private drawBishopPossibleMovements(position: Position): void {

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

  private drawQueenPossibleMovements(position: Position, piece: PieceModel): void {
    this.drawBishopPossibleMovements(position);
    this.drawRookPossibleMovements(position, piece);
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

      if (!this.drawPiecePossibleMovementsByCoordinates(x, y)) {
        break;
      }

    }
  }

  private drawPiecePossibleMovementsByCoordinates(x, y): boolean {
    const positionByCoordinate = this.boardPositionsMap.getPositionByCoordinates(x, y);

    if (positionByCoordinate === undefined) {
      return false;
    }

    this.drawSquareBorder(x, y);
    return true;
  }

  private isPawnFirstMovement(position: Position, piece: PieceModel): boolean {
    return piece.position === position.coordinate;
  }

  private drawSquareBorder(x, y): void {
    this.context.beginPath();
    this.context.strokeStyle = '#AFEEEE';
    this.context.lineWidth = 5;
    this.context.strokeRect(x, y, SizesEnum.SQUARE_WIDTH, SizesEnum.SQUARE_HEIGHT);
    this.context.fill();
    this.context.closePath();
  }

}
