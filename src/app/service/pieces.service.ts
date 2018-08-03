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
      this.drawPawnPossibleMovements(position, piece, true);
    }

    if (this.isWhitePawn(piece)) {
      this.drawPawnPossibleMovements(position, piece, false);
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

  private isWhitePawn(piece): boolean {
    return piece.name === PiecesNamesEnum.WHITE_PAWN;
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

  private drawPawnPossibleMovements(position: Position, piece: PieceModel, isBlack: boolean = true): void {

    const x = position.startX;
    let y = 0;
    if (isBlack) {
      y = position.startY + SizesEnum.SQUARE_HEIGHT;
    } else {
      y = position.startY - SizesEnum.SQUARE_HEIGHT;
    }

    if (this.hasPiece(x, y)) {
      return;
    }

    this.drawSquareBorder(x, y);

    if (!this.isPawnFirstMovement(position, piece)) {
      return;
    }

    if (isBlack) {
      y = position.startY + SizesEnum.SQUARE_HEIGHT * 2;
    } else {
      y = position.startY - SizesEnum.SQUARE_HEIGHT * 2;
    }

    if (this.hasPiece(x, y)) {
      return;
    }

    this.drawSquareBorder(x, y);
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
    let stopOnNext = false;
    for (let i = 0; i < 7; i++) {

      if (isVertical) {
        x = position.startX;
        y = position.startY + SizesEnum.SQUARE_HEIGHT * (isPositive ? (i + 1) : -(i + 1));
      } else {
        x = position.startX + SizesEnum.SQUARE_HEIGHT * (isPositive ? (i + 1) : -(i + 1));
        y = position.startY;
      }

      const newPosition = this.boardPositionsMap.getPositionByCoordinates(x, y);
      const isFromSameSide = this.isFromSameSide(position, newPosition);

      if (isFromSameSide) {
        break;
      }

      if (!this.drawPiecePossibleMovementsByCoordinates(x, y)) {
        break;
      }

      if (!isFromSameSide && this.hasPiece(x, y)) {
        stopOnNext = true;
      }
    }
  }

  private drawKnightPossibleMovements(position: Position, piece: PieceModel): void {

    // TOP_LEFT
    this.drawKnightSquares(position, KnightEnum.TOP_LEFT);

    // TOP_RIGHT
    this.drawKnightSquares(position, KnightEnum.TOP_RIGHT);

    // RIGHT_TOP
    this.drawKnightSquares(position, KnightEnum.RIGHT_TOP);

    // RIGHT_BOTTOM
    this.drawKnightSquares(position, KnightEnum.RIGHT_BOTTOM);

    // BOTTOM_LEFT
    this.drawKnightSquares(position, KnightEnum.BOTTOM_LEFT);

    // BOTTOM_RIGHT
    this.drawKnightSquares(position, KnightEnum.BOTTOM_RIGHT);

    // BOTTOM_LEFT
    this.drawKnightSquares(position, KnightEnum.LEFT_TOP);

    // BOTTOM_RIGHT
    this.drawKnightSquares(position, KnightEnum.LEFT_BOTTOM);

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
        x = position.startX + SizesEnum.SQUARE_HEIGHT * (i + 1);
        y = position.startY;
      }

      if (
        location === KnightEnum.BOTTOM_LEFT ||
        location === KnightEnum.BOTTOM_RIGHT
      ) {
        x = position.startX;
        y = position.startY + SizesEnum.SQUARE_HEIGHT * (i + 1);
      }

      if (
        location === KnightEnum.LEFT_TOP ||
        location === KnightEnum.LEFT_BOTTOM
      ) {
        x = position.startX - SizesEnum.SQUARE_HEIGHT * (i + 1);
        y = position.startY;
      }

      this.drawPiecePossibleMovementsByCoordinates(x, y);
    }

    if (
      location === KnightEnum.TOP_LEFT ||
      location === KnightEnum.BOTTOM_LEFT
    ) {
      x -= SizesEnum.SQUARE_HEIGHT;
    }

    if (
      location === KnightEnum.TOP_RIGHT ||
      location === KnightEnum.BOTTOM_RIGHT
    ) {
      x += SizesEnum.SQUARE_HEIGHT;
    }

    if (
      location === KnightEnum.LEFT_TOP ||
      location === KnightEnum.RIGHT_TOP
    ) {
      y -= SizesEnum.SQUARE_HEIGHT;
    }

    if (
      location === KnightEnum.RIGHT_BOTTOM ||
      location === KnightEnum.LEFT_BOTTOM
    ) {
      y += SizesEnum.SQUARE_HEIGHT;
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

    if (location === KnightEnum.RIGHT_TOP) {
      x = position.startX + SizesEnum.SQUARE_HEIGHT * 2;
      y = position.startY - SizesEnum.SQUARE_HEIGHT;
    }

    if (location === KnightEnum.RIGHT_BOTTOM) {
      x = position.startX + SizesEnum.SQUARE_HEIGHT * 2;
      y = position.startY + SizesEnum.SQUARE_HEIGHT;
    }

    if (location === KnightEnum.BOTTOM_LEFT) {
      x = position.startX - SizesEnum.SQUARE_HEIGHT;
      y = position.startY + SizesEnum.SQUARE_HEIGHT * 2;
    }

    if (location === KnightEnum.BOTTOM_RIGHT) {
      x = position.startX + SizesEnum.SQUARE_HEIGHT;
      y = position.startY + SizesEnum.SQUARE_HEIGHT * 2;
    }

    if (location === KnightEnum.LEFT_TOP) {
      x = position.startX - SizesEnum.SQUARE_HEIGHT * 2;
      y = position.startY - SizesEnum.SQUARE_HEIGHT;
    }

    if (location === KnightEnum.LEFT_BOTTOM) {
      x = position.startX - SizesEnum.SQUARE_HEIGHT * 2;
      y = position.startY + SizesEnum.SQUARE_HEIGHT;
    }

    const newPosition = this.boardPositionsMap.getPositionByCoordinates(x, y);

    if (newPosition === undefined) {
      return false;
    }

    const isMyPiece = this.isFromSameSide(position, newPosition);

    return !isMyPiece;
  }

  private isFromSameSide(position: Position, anotherPosition: Position): boolean {

    if (
      !position ||
      !position.coordinate ||
      !anotherPosition ||
      !anotherPosition.coordinate
    ) {
      return false;
    }

    const piece1 = this.positionMap.map.get(position.coordinate);
    const piece2 = this.positionMap.map.get(anotherPosition.coordinate);

    return piece1 &&
      piece2 &&
      piece1.type &&
      piece2.type &&
      piece1.type === piece2.type;
  }

  private hasPiece(x: number, y: number): boolean {
    const position = this.boardPositionsMap.getPositionByCoordinates(x, y);
    return this.positionMap.map.has(position.coordinate);
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

      const newPosition = this.boardPositionsMap.getPositionByCoordinates(x, y);
      const isFromSameSide = this.isFromSameSide(position, newPosition);

      if (isFromSameSide) {
        break;
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

  private drawSquareBorder(x, y, color: string = '#AFEEEE'): void {
    this.context.beginPath();
    this.context.strokeStyle = 'color';
    this.context.lineWidth = 5;
    this.context.strokeRect(x, y, SizesEnum.SQUARE_WIDTH, SizesEnum.SQUARE_HEIGHT);
    this.context.fill();
    this.context.closePath();
  }

}
