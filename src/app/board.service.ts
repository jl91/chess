import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {

  private context: CanvasRenderingContext2D;
  private readonly columnWidth = 75
  private readonly lineHeight = 75
  private readonly firstColor = 'white';
  private readonly secondColor = 'black';


  public drawBoard(context: CanvasRenderingContext2D): void {
    this.context = context;
    let x = 0;
    let y = 0;
    for (let i = 0; i < 8; i++) {
      this.drawLine(i, x, y);
      x = 0;
      y += this.columnWidth;
    }
  }

  private drawLine(i: number, x: number, y: number) {
    for (let j = 0; j < 8; j++) {
      this.drawSquare(x, y, i, j);
      x += this.columnWidth;
    }
  }

  private drawSquare(x: number, y: number, row: number, column: number): void {
    this.context.beginPath();
    const isEvenRow = this.isEven(row);
    const isEvenColumn = this.isEven(column);
    this.context.fillStyle = this.getSquareColor(isEvenRow, isEvenColumn);
    this.context.fillRect(x, y, this.columnWidth, this.lineHeight);
    this.context.closePath();
    this.context.fill();
  }

  private isEven(value: number): boolean {
    return value % 2 == 0;
  }

  private getSquareColor(isEvenRow: boolean, isEvenColumn: boolean): string {
    let color = '';

    if (isEvenRow) {
      color = isEvenColumn ? this.firstColor : this.secondColor;
    } else {
      color = isEvenColumn ? this.secondColor : this.firstColor;
    }
    return color;
  }
}
