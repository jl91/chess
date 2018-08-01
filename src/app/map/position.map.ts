import {PiecesNamesEnum} from '../enum/pieces-names.enum';
import {PositionsEnum} from '../enum/positions.enum';
import {PieceModel} from '../model/piece.model';
import {PieceFactory} from '../model/piece.factory';

export class PositionMap {
  public map = new Map<PositionsEnum, PieceModel>();

  constructor() {
    this.restartPieces();
  }

  public restartPieces(): void {

    this.map.set(PositionsEnum.A1, PieceFactory.fabricate(PiecesNamesEnum.WHITE_ROOK, PositionsEnum.A1));
    this.map.set(PositionsEnum.B1, PieceFactory.fabricate(PiecesNamesEnum.WHITE_KNIGHT, PositionsEnum.B1));
    this.map.set(PositionsEnum.C1, PieceFactory.fabricate(PiecesNamesEnum.WHITE_BISHOP, PositionsEnum.C1));
    this.map.set(PositionsEnum.D1, PieceFactory.fabricate(PiecesNamesEnum.WHITE_QUEEN, PositionsEnum.D1));
    this.map.set(PositionsEnum.E1, PieceFactory.fabricate(PiecesNamesEnum.WHITE_KING, PositionsEnum.E1));
    this.map.set(PositionsEnum.F1, PieceFactory.fabricate(PiecesNamesEnum.WHITE_BISHOP, PositionsEnum.F1));
    this.map.set(PositionsEnum.G1, PieceFactory.fabricate(PiecesNamesEnum.WHITE_KNIGHT, PositionsEnum.G1));
    this.map.set(PositionsEnum.H1, PieceFactory.fabricate(PiecesNamesEnum.WHITE_ROOK, PositionsEnum.H1));

    this.map.set(PositionsEnum.A2, PieceFactory.fabricate(PiecesNamesEnum.WHITE_PAWN, PositionsEnum.A2));
    this.map.set(PositionsEnum.B2, PieceFactory.fabricate(PiecesNamesEnum.WHITE_PAWN, PositionsEnum.B2));
    this.map.set(PositionsEnum.C2, PieceFactory.fabricate(PiecesNamesEnum.WHITE_PAWN, PositionsEnum.C2));
    this.map.set(PositionsEnum.D2, PieceFactory.fabricate(PiecesNamesEnum.WHITE_PAWN, PositionsEnum.D2));
    this.map.set(PositionsEnum.E2, PieceFactory.fabricate(PiecesNamesEnum.WHITE_PAWN, PositionsEnum.E2));
    this.map.set(PositionsEnum.F2, PieceFactory.fabricate(PiecesNamesEnum.WHITE_PAWN, PositionsEnum.F2));
    this.map.set(PositionsEnum.G2, PieceFactory.fabricate(PiecesNamesEnum.WHITE_PAWN, PositionsEnum.G2));
    this.map.set(PositionsEnum.H2, PieceFactory.fabricate(PiecesNamesEnum.WHITE_PAWN, PositionsEnum.H2));


    this.map.set(PositionsEnum.A8, PieceFactory.fabricate(PiecesNamesEnum.BLACK_ROOK, PositionsEnum.A8));
    this.map.set(PositionsEnum.B8, PieceFactory.fabricate(PiecesNamesEnum.BLACK_KNIGHT, PositionsEnum.B8));
    this.map.set(PositionsEnum.C8, PieceFactory.fabricate(PiecesNamesEnum.BLACK_BISHOP, PositionsEnum.C8));
    this.map.set(PositionsEnum.D8, PieceFactory.fabricate(PiecesNamesEnum.BLACK_QUEEN, PositionsEnum.D8));
    this.map.set(PositionsEnum.E8, PieceFactory.fabricate(PiecesNamesEnum.BLACK_KING, PositionsEnum.E8));
    this.map.set(PositionsEnum.F8, PieceFactory.fabricate(PiecesNamesEnum.BLACK_BISHOP, PositionsEnum.F8));
    this.map.set(PositionsEnum.D4, PieceFactory.fabricate(PiecesNamesEnum.BLACK_KNIGHT, PositionsEnum.G8));
    this.map.set(PositionsEnum.H8, PieceFactory.fabricate(PiecesNamesEnum.BLACK_ROOK, PositionsEnum.H8));

    this.map.set(PositionsEnum.A7, PieceFactory.fabricate(PiecesNamesEnum.BLACK_PAWN, PositionsEnum.A7));
    this.map.set(PositionsEnum.B7, PieceFactory.fabricate(PiecesNamesEnum.BLACK_PAWN, PositionsEnum.B7));
    this.map.set(PositionsEnum.C7, PieceFactory.fabricate(PiecesNamesEnum.BLACK_PAWN, PositionsEnum.C7));
    this.map.set(PositionsEnum.D7, PieceFactory.fabricate(PiecesNamesEnum.BLACK_PAWN, PositionsEnum.D7));
    this.map.set(PositionsEnum.E7, PieceFactory.fabricate(PiecesNamesEnum.BLACK_PAWN, PositionsEnum.E7));
    this.map.set(PositionsEnum.F7, PieceFactory.fabricate(PiecesNamesEnum.BLACK_PAWN, PositionsEnum.F7));
    this.map.set(PositionsEnum.G7, PieceFactory.fabricate(PiecesNamesEnum.BLACK_PAWN, PositionsEnum.G7));
    this.map.set(PositionsEnum.H7, PieceFactory.fabricate(PiecesNamesEnum.BLACK_PAWN, PositionsEnum.H7));
  }


}
