import { PositionsEnum } from "../enum/positions.enum";
import { Position } from "../model/position";

export class BoardPositionsMap {
  public map = new Map<PositionsEnum, Position>();
  private readonly columnIndexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  private readonly rowIndexes = ['8', '7', '6', '5', '4', '3', '2', '1'];

  constructor() {
    const border = 25;
    const increment = 75;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const row = this.rowIndexes[i];
        const column = this.columnIndexes[j];
        const coordinate = PositionsEnum[column + row];
        const position = new Position();
        position.coordinate = coordinate;
        position.dstX = increment * j + border;
        position.dstY = increment * i + border;
        this.map.set(coordinate, position);
      }
    }
  }

}
