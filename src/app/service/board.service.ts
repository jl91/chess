import { Injectable } from '@angular/core';
import { SquareModel } from "../model/square.model";

@Injectable()
export class BoardService {

  private context: CanvasRenderingContext2D;
  private readonly columnWidth = 75
  private readonly rowHeight = 75
  private readonly columnsSize = 8;
  private readonly rowsSize = 8;
  private readonly firstColor = '#FF8C00';
  private readonly secondColor = '#8B4513';
  private readonly columnIndexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  private readonly rowIndexes = ['8', '7', '6', '5', '4', '3', '2', '1'];

  private boardMap = new Map<string, SquareModel>();

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
    const increment = 75;
    for (let i = 0; i < 8; i++) {

      let columnWord = this.columnIndexes[i];
      let rowWord = this.rowIndexes[i];

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
    let x = 25;
    let y = 25;
    for (let i = 0; i < this.rowsSize; i++) {
      this.drawRow(i, x, y);
      x = 25;
      y += this.columnWidth;
    }
  }

  private drawRow(i: number, x: number, y: number) {
    for (let j = 0; j < this.columnsSize; j++) {
      this.addToMap(i, j);
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

  private addToMap(rowIndex: number, columnIndex: number): void {
    const square = new SquareModel();
    square.column = this.columnIndexes[columnIndex];
    square.row = this.rowIndexes[rowIndex];
    const coordinate = square.row + square.column;
    this.boardMap.set(coordinate, square);
  }
}
