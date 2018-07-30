import {ElementRef, Injectable} from '@angular/core';
import {BoardService} from './board.service';
import {PiecesService} from './pieces.service';

@Injectable()
export class AppService {
  private elementRef: ElementRef;
  private context: CanvasRenderingContext2D;
  private readonly canvasWidth = 650;
  private readonly canvasHeight = 650;

  constructor(
    private boardService: BoardService,
    private piecesService: PiecesService
  ) {
  }

  public initCanvas(elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.elementRef.nativeElement.width = this.canvasWidth;
    this.elementRef.nativeElement.height = this.canvasHeight;
    this.context = elementRef.nativeElement.getContext('2d');
    this.boardService.drawBoard(this.context);
    this.piecesService.drawPieces(this.context);
  }

  public onMouseMove(event: MouseEvent): void {
    this.boardService.drawMouseOver(event.offsetX, event.offsetY);
  }

  public onClick(event: MouseEvent): void {
    this.boardService.drawPiecePossibleMoviments(event.offsetX, event.offsetY);
  }
}
