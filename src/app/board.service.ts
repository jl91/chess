import { Injectable } from '@angular/core';
import { SquareModel } from "./square-model";

@Injectable()
export class BoardService {

  private context: CanvasRenderingContext2D;
  private readonly columnWidth = 75
  private readonly rowHeight = 75
  private readonly columnsSize = 8;
  private readonly rowsSize = 8;
  private readonly firstColor = '#FF8C00';
  private readonly secondColor = '#8B4513';
  private boardMap = new Map<string, SquareModel>();

  private readonly columnIndexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  private readonly rowIndexes = ['8', '7', '6', '5', '4', '3', '2', '1'];


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

    //top
    this.drawBoardCoordinate('A', 55, 18);
    this.drawBoardCoordinate('B', 130, 18);
    this.drawBoardCoordinate('C', 205, 18);
    this.drawBoardCoordinate('D', 280, 18);
    this.drawBoardCoordinate('E', 355, 18);
    this.drawBoardCoordinate('F', 430, 18);
    this.drawBoardCoordinate('G', 505, 18);
    this.drawBoardCoordinate('H', 580, 18);

    //right
    this.drawBoardCoordinate('8', 632.5, 70);
    this.drawBoardCoordinate('7', 632.5, 145);
    this.drawBoardCoordinate('6', 632.5, 215);
    this.drawBoardCoordinate('5', 632.5, 295);
    this.drawBoardCoordinate('4', 632.5, 365);
    this.drawBoardCoordinate('3', 632.5, 440);
    this.drawBoardCoordinate('2', 632.5, 515);
    this.drawBoardCoordinate('1', 632.5, 590);

    //bottom
    this.drawBoardCoordinate('A', 55, 645);
    this.drawBoardCoordinate('B', 130, 645);
    this.drawBoardCoordinate('C', 205, 645);
    this.drawBoardCoordinate('D', 280, 645);
    this.drawBoardCoordinate('E', 355, 645);
    this.drawBoardCoordinate('F', 430, 645);
    this.drawBoardCoordinate('G', 505, 645);
    this.drawBoardCoordinate('H', 580, 645);

    //left
    this.drawBoardCoordinate('8', 6, 70);
    this.drawBoardCoordinate('7', 6, 145);
    this.drawBoardCoordinate('6', 6, 215);
    this.drawBoardCoordinate('5', 6, 295);
    this.drawBoardCoordinate('4', 6, 365);
    this.drawBoardCoordinate('3', 6, 440);
    this.drawBoardCoordinate('2', 6, 515);
    this.drawBoardCoordinate('1', 6, 590);
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
