import { Injectable } from '@angular/core';

@Injectable()
export class PiecesService {

  private context: CanvasRenderingContext2D;
  private image = new Image(75, 75);

  constructor() {
  }

  drawPieces(context: CanvasRenderingContext2D): void {
    this.context = context;
    this.image.src = '../assets/chess-pieces-sprite.svg';
    this.image
      .addEventListener('load', () => {
        this.context.beginPath();
        this.context.drawImage(this.image,
          223, 45,   // Start at 70/20 pixels from the left and the top of the image (crop),
          48, 50,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
          0, 0,     // Place the result at 0, 0 in the canvas,
          75, 75
        );
        this.context.closePath();
        this.context.fill();
      });
  }
}
