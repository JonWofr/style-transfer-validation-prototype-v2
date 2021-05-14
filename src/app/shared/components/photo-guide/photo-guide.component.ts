import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-photo-guide',
  templateUrl: './photo-guide.component.html',
  styleUrls: ['./photo-guide.component.scss'],
})
export class PhotoGuideComponent implements OnInit {
  @Input() displayExampleImage = true;
  @Input() displayHeader = true;

  constructor() {}

  ngOnInit(): void {}
}
