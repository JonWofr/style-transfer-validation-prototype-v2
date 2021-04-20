import { Component, OnInit } from '@angular/core';

import SwiperCore, { Thumbs, Controller, Swiper } from 'swiper/core';

SwiperCore.use([Thumbs, Controller]);

@Component({
  selector: 'app-description-swiper',
  templateUrl: './description-swiper.component.html',
  styleUrls: ['./description-swiper.component.scss'],
})
export class DescriptionSwiperComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initDescriptionSwiper();
  }

  isDescriptionActive = true;

  descriptionSwiper: Swiper;

  initDescriptionSwiper() {
    this.descriptionSwiper = new Swiper('.swiper-product-info', {
      slidesPerView: 1,
      allowTouchMove: false,
    });
  }

  toggleTo(index: number) {
    this.isDescriptionActive = 0 == index;
    this.descriptionSwiper.slideTo(index);
  }
}
