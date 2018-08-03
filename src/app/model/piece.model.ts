import { PositionsEnum } from '../enum/positions.enum';
import { PiecesNamesEnum } from '../enum/pieces-names.enum';
import { PieceTypeEnum } from "../enum/piece-type.enum";

export class PieceModel {
  public name: PiecesNamesEnum;
  public position: PositionsEnum;
  public type: PieceTypeEnum;
}
