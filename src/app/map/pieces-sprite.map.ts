import {PieceSpriteCoordinateModel} from '../model/piece-sprite-coordinate.model';
import {PiecesNamesEnum} from '../enum/pieces-names.enum';

export class PiecesSpriteMap {
  private map = new Map<PiecesNamesEnum, PieceSpriteCoordinateModel>();

  constructor() {
    this.map.set(PiecesNamesEnum.WHITE_KING, this.fabricateModel(0, 0, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.WHITE_QUEEN, this.fabricateModel(45, 0, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.WHITE_BISHOP, this.fabricateModel(90, 0, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.WHITE_KNIGHT, this.fabricateModel(135, 0, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.WHITE_ROOK, this.fabricateModel(179, 0, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.WHITE_PAWN, this.fabricateModel(223, 0, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.BLACK_KING, this.fabricateModel(0, 45, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.BLACK_QUEEN, this.fabricateModel(45, 45, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.BLACK_BISHOP, this.fabricateModel(90, 45, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.BLACK_KNIGHT, this.fabricateModel(135, 45, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.BLACK_ROOK, this.fabricateModel(179, 45, 48, 50, 75, 75));
    this.map.set(PiecesNamesEnum.BLACK_PAWN, this.fabricateModel(223, 45, 48, 50, 75, 75));
  }

  public getPieceSpriteCoordinate(pieceName: PiecesNamesEnum): PieceSpriteCoordinateModel {
    return this.map.get(pieceName);
  }


  private fabricateModel(
    srcX: number,
    srcY: number,
    srcW: number,
    srcH: number,
    dstW: number,
    dstH: number
  ): PieceSpriteCoordinateModel {
    const model = new PieceSpriteCoordinateModel();
    model.srcX = srcX;
    model.srcY = srcY;
    model.srcW = srcW;
    model.srcH = srcH;
    model.dstX = 0;
    model.dstY = 0;
    model.dstW = dstW;
    model.dstH = dstH;
    return model;
  }

}
