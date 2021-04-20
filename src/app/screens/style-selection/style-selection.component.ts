import { Component, OnInit } from '@angular/core';
import { StyleImage } from 'src/app/shared/models/style-image.model';
import { styleImages } from 'src/app/shared/raw/style-images';

@Component({
  selector: 'app-style-selection',
  templateUrl: './style-selection.component.html',
  styleUrls: ['./style-selection.component.scss'],
})
export class StyleSelectionComponent implements OnInit {
  styleImages: StyleImage[] = [];

  constructor() {}

  ngOnInit(): void {
    this.styleImages = styleImages;
  }
}
