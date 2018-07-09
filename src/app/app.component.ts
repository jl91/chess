import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from "./service/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('mainCanvas')
  public mainCanvas: ElementRef;

  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    this.appService.initCanvas(this.mainCanvas);
  }

}
