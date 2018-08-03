import { PieceModel } from './piece.model';
import { PiecesNamesEnum } from '../enum/pieces-names.enum';
import { PositionsEnum } from '../enum/positions.enum';
import { PieceTypeEnum } from "../enum/piece-type.enum";

export class PieceFactory {

  static fabricate(name: PiecesNamesEnum, position: PositionsEnum): PieceModel {
    const piece = new PieceModel();
    piece.name = name;
    piece.position = position;
    piece.type = PieceFactory.getType(name);

    return piece;
  }

  private static getType(name: PiecesNamesEnum): PieceTypeEnum {

    if (
      name === PiecesNamesEnum.WHITE_KING ||
      name === PiecesNamesEnum.WHITE_QUEEN ||
      name === PiecesNamesEnum.WHITE_BISHOP ||
      name === PiecesNamesEnum.WHITE_KNIGHT ||
      name === PiecesNamesEnum.WHITE_ROOK ||
      name === PiecesNamesEnum.WHITE_PAWN
    ) {
      return PieceTypeEnum.WHITE
    }

    if (
      name === PiecesNamesEnum.BLACK_KING ||
      name === PiecesNamesEnum.BLACK_QUEEN ||
      name === PiecesNamesEnum.BLACK_BISHOP ||
      name === PiecesNamesEnum.BLACK_KNIGHT ||
      name === PiecesNamesEnum.BLACK_ROOK ||
      name === PiecesNamesEnum.BLACK_PAWN
    ) {
      return PieceTypeEnum.BLACK;
    }

    return undefined;
  }
}
