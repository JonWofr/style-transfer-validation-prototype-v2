import { Component, OnInit } from '@angular/core';

import SwiperCore, { Thumbs, Controller, Swiper, Autoplay } from 'swiper/core';

SwiperCore.use([Thumbs, Controller, Autoplay]);

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initPreviewSwiper();
  }

  initPreviewSwiper() {
    const swiper = new Swiper('.swiper-preview', {
      slidesPerView: 1,
      autoplay: {
        delay: 4000,
      },
    });
  }
}
