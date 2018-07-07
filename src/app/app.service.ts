import { ElementRef, Injectable } from '@angular/core';
import { BoardService } from "./board.service";

@Injectable()
export class AppService {
  private elementRef: ElementRef;
  private context: CanvasRenderingContext2D;
  private readonly canvasWidth = 600;
  private readonly canvasHeight = 600;

  constructor(private boardService: BoardService) {

  }

  public initCanvas(elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.elementRef.nativeElement.width = this.canvasWidth;
    this.elementRef.nativeElement.height = this.canvasHeight;
    this.context = elementRef.nativeElement.getContext('2d')
    this.boardService.drawBoard(this.context);
  }


}
