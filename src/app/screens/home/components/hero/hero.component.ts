import { Component, OnInit } from '@angular/core';

import SwiperCore, {
  Thumbs,
  Controller,
  Swiper,
  Autoplay,
  EffectCube,
} from 'swiper/core';

SwiperCore.use([Thumbs, Controller, Autoplay, EffectCube]);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initHeroSwiper();
  }

  initHeroSwiper() {
    const swiper = new Swiper('.swiper-hero', {
      slidesPerView: 1,
      autoplay: {
        delay: 4000,
      },
    });
  }
}
