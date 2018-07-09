import { Injectable } from '@angular/core';
import { BoardPositionsMap } from "../map/board-positions.map";
import { SizesEnum } from "../enum/sizes.enum";
import { Position } from "../model/position";

@Injectable()
export class BoardService {

  private context: CanvasRenderingContext2D;
  private readonly columnWidth = SizesEnum.SQUARE_WIDTH;
  private readonly rowHeight = SizesEnum.SQUARE_HEIGHT
  private readonly columnsSize = 8;
  private readonly rowsSize = 8;
  private readonly firstColor = '#FF8C00';
  private readonly secondColor = '#8B4513';

  constructor(private boardPositionsMap: BoardPositionsMap) {

  }

  public drawBoard(context: CanvasRenderingContext2D): void {
    this.context = context;
    this.drawBorder();
    this.drawBoardCoordinates();
    this.drawSquares();
  }

  private drawBorder(): void {
    const canvas = this.context.canvas;
    this.context.beginPath();
    this.context.lineWidth = 48;
    this.context.strokeStyle = '#8B4513';
    this.context.strokeRect(0, 0, canvas.width, canvas.height);
    this.context.closePath();
    this.context.fill();
  }

  private drawBoardCoordinates(): void {

    const hSpace = 55;
    const vSpace = 70;
    const increment = SizesEnum.SQUARE_WIDTH as number;
    for (let i = 0; i < 8; i++) {

      let columnWord = this.boardPositionsMap.columnIndexes[i];
      let rowWord = this.boardPositionsMap.rowIndexes[i];

      //top
      this.drawBoardCoordinate(columnWord, increment * i + hSpace, 18);

      //botom
      this.drawBoardCoordinate(columnWord, increment * i + hSpace, 645);

      //left
      this.drawBoardCoordinate(rowWord, 6, increment * i + vSpace);

      //right
      this.drawBoardCoordinate(rowWord, 632.5, increment * i + vSpace);
    }

  }

  private drawBoardCoordinate(word: string, x: number, y: number): void {
    this.context.beginPath();
    this.context.font = "20px Arial";
    this.context.fillStyle = 'white';
    this.context.fillText(word, x, y);
    this.context.closePath();
    this.context.fill();
  }

  private drawSquares(): void {
    let x = SizesEnum.BORDER_SIZE;
    let y = SizesEnum.BORDER_SIZE;
    for (let i = 0; i < this.rowsSize; i++) {
      this.drawRow(i, x, y);
      x = SizesEnum.BORDER_SIZE;
      y += this.columnWidth;
    }
  }

  private drawRow(i: number, x: number, y: number) {
    for (let j = 0; j < this.columnsSize; j++) {
      this.drawSquare(x, y, i, j);
      x += this.columnWidth;
    }
  }

  private drawSquare(x: number, y: number, row: number, column: number): void {
    this.context.beginPath();
    const isEvenRow = this.isEven(row);
    const isEvenColumn = this.isEven(column);
    this.context.fillStyle = this.getSquareColor(isEvenRow, isEvenColumn);
    this.context.fillRect(x, y, this.columnWidth, this.rowHeight);
    this.context.closePath();
    this.context.fill();
  }

  private isEven(value: number): boolean {
    return value % 2 == 0;
  }

  private getSquareColor(isEvenRow: boolean, isEvenColumn: boolean): string {
    if (isEvenRow) {
      return isEvenColumn ? this.firstColor : this.secondColor;
    }
    return isEvenColumn ? this.secondColor : this.firstColor;
  }

  public drawMouseOver(x: number, y: number): void {
    this.boardPositionsMap
      .map
      .forEach((position: Position, key) => {
        if (
          x >= position.startX && x <= position.endX &&
          y >= position.startY && y <= position.endY
        ) {
          this.drawSquareBorder(position);
        }
      });
  }

  private drawSquareBorder(position: Position): void {
    this.context.beginPath();
    this.context.strokeStyle = '#AFEEEE';
    this.context.lineWidth = 5;
    this.context.strokeRect(position.startX, position.startY, SizesEnum.SQUARE_WIDTH, SizesEnum.SQUARE_HEIGHT);
    this.context.fill();
    this.context.closePath();
  }
}
