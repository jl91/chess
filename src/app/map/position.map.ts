import { PiecesNamesEnum } from "../enum/pieces-names.enum";
import { PositionsEnum } from "../enum/positions.enum";

export class PositionMap {
  public map = new Map<PositionsEnum, PiecesNamesEnum>();

  constructor() {
    this.restartPieces();
  }

  public restartPieces(): void {
    this.map.set(PositionsEnum.A1, PiecesNamesEnum.WHITE_ROOK);
    this.map.set(PositionsEnum.B1, PiecesNamesEnum.WHITE_KNIGHT);
    this.map.set(PositionsEnum.C1, PiecesNamesEnum.WHITE_BISHOP);
    this.map.set(PositionsEnum.D1, PiecesNamesEnum.WHITE_QUEEN);
    this.map.set(PositionsEnum.E1, PiecesNamesEnum.WHITE_KING);
    this.map.set(PositionsEnum.F1, PiecesNamesEnum.WHITE_BISHOP);
    this.map.set(PositionsEnum.G1, PiecesNamesEnum.WHITE_KNIGHT);
    this.map.set(PositionsEnum.H1, PiecesNamesEnum.WHITE_ROOK);

    this.map.set(PositionsEnum.A2, PiecesNamesEnum.WHITE_PAWN);
    this.map.set(PositionsEnum.B2, PiecesNamesEnum.WHITE_PAWN);
    this.map.set(PositionsEnum.C2, PiecesNamesEnum.WHITE_PAWN);
    this.map.set(PositionsEnum.D2, PiecesNamesEnum.WHITE_PAWN);
    this.map.set(PositionsEnum.E2, PiecesNamesEnum.WHITE_PAWN);
    this.map.set(PositionsEnum.F2, PiecesNamesEnum.WHITE_PAWN);
    this.map.set(PositionsEnum.G2, PiecesNamesEnum.WHITE_PAWN);
    this.map.set(PositionsEnum.H2, PiecesNamesEnum.WHITE_PAWN);

    this.map.set(PositionsEnum.A8, PiecesNamesEnum.BLACK_ROOK);
    this.map.set(PositionsEnum.B8, PiecesNamesEnum.BLACK_KNIGHT);
    this.map.set(PositionsEnum.C8, PiecesNamesEnum.BLACK_BISHOP);
    this.map.set(PositionsEnum.D8, PiecesNamesEnum.BLACK_QUEEN);
    this.map.set(PositionsEnum.E8, PiecesNamesEnum.BLACK_KING);
    this.map.set(PositionsEnum.F8, PiecesNamesEnum.BLACK_BISHOP);
    this.map.set(PositionsEnum.G8, PiecesNamesEnum.BLACK_KNIGHT);
    this.map.set(PositionsEnum.H8, PiecesNamesEnum.BLACK_ROOK);

    this.map.set(PositionsEnum.A7, PiecesNamesEnum.BLACK_PAWN);
    this.map.set(PositionsEnum.B7, PiecesNamesEnum.BLACK_PAWN);
    this.map.set(PositionsEnum.C7, PiecesNamesEnum.BLACK_PAWN);
    this.map.set(PositionsEnum.D7, PiecesNamesEnum.BLACK_PAWN);
    this.map.set(PositionsEnum.E7, PiecesNamesEnum.BLACK_PAWN);
    this.map.set(PositionsEnum.F7, PiecesNamesEnum.BLACK_PAWN);
    this.map.set(PositionsEnum.G7, PiecesNamesEnum.BLACK_PAWN);
    this.map.set(PositionsEnum.H7, PiecesNamesEnum.BLACK_PAWN);
  }


}
