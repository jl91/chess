import { PieceModel } from "./piece.model";
import { PiecesNamesEnum } from "../enum/pieces-names.enum";
import { PositionsEnum } from "../enum/positions.enum";

export class PieceFactory {

  static fabricate(name: PiecesNamesEnum, position: PositionsEnum): PieceModel {
    const piece = new PieceModel();
    piece.name = name;
    piece.position = position
    return piece;
  }
}
