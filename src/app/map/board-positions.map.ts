import { PositionsEnum } from "../enum/positions.enum";
import { Position } from "../model/position";
import { SizesEnum } from "../enum/sizes.enum";

export class BoardPositionsMap {
  public map = new Map<PositionsEnum, Position>();
  public readonly columnIndexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  public readonly rowIndexes = ['8', '7', '6', '5', '4', '3', '2', '1'];

  constructor() {
    const increment = SizesEnum.SQUARE_WIDTH;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {

        const row = this.rowIndexes[i];

        const column = this.columnIndexes[j];

        const coordinate = PositionsEnum[column + row];

        const position = new Position();

        position.coordinate = coordinate;

        position.dstX = increment * j + SizesEnum.BORDER_SIZE;
        position.dstY = increment * i + SizesEnum.BORDER_SIZE;

        position.startX = (increment * j + SizesEnum.BORDER_SIZE) + 1;
        position.endX = (increment * (j + 1) + SizesEnum.BORDER_SIZE) - 1;

        position.startY = (increment * i + SizesEnum.BORDER_SIZE) + 1;
        position.endY = (increment * (i + 1) + SizesEnum.BORDER_SIZE) - 1;
        this.map.set(coordinate, position);
      }
    }
  }

  public getPositionByCoordinates(x: number, y: number): Position | null {

    const position = Array.from(this.map.values())
      .find((current: Position) => {
        return x >= current.startX &&
          x <= current.endX &&
          y >= current.startY &&
          y <= current.endY;
      });

    return position;
  }

}
