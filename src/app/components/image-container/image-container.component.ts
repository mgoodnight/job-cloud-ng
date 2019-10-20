import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit {

  @Input('imgData') imgData: string;

  constructor() { }

  ngOnInit() {
  }

  public scrollToImage(): void {
    window.scroll({
      top: 500,
      left: 0,
      behavior: 'smooth'
    });
  }
}
