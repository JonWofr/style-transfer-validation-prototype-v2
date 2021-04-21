import { Component, OnInit } from '@angular/core';
import { RouterStateService } from '../../shared/services/router-state/router-state.service';

import SwiperCore, { Thumbs, Controller, Swiper, Autoplay } from 'swiper/core';
import { Router } from '@angular/router';

SwiperCore.use([Thumbs, Controller, Autoplay]);

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  selectedFile: File;
  petName: string;
  petBirthMonth: string;

  constructor(
    private routerStateService: RouterStateService,
    private router: Router
  ) {}

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

  onSubmitForm(submitEvent: Event) {
    submitEvent.preventDefault();
    this.routerStateService.state = {
      petName: this.petName,
      petBirthMonth: this.petBirthMonth,
      selectedFile: this.selectedFile,
    };
    this.router.navigateByUrl('/summary');
  }
}
