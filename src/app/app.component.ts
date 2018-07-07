import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('mainCanvas')
  public mainCanvas: ElementRef;

  private context: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.context = this.mainCanvas.nativeElement.getContext('2d');
  }

}
