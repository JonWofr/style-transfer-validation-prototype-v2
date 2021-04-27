import { Component, OnInit } from '@angular/core';
import { RouterStateService } from '../../shared/services/router-state/router-state.service';

import SwiperCore, { Thumbs, Controller, Swiper, Autoplay } from 'swiper/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { StyleImage } from 'src/app/shared/models/style-image.model';
import { styleImages } from 'src/app/shared/raw/style-images';

SwiperCore.use([Thumbs, Controller, Autoplay]);

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  selectedStyleImage: StyleImage;
  selectedFile: File;
  petName: string;
  petBirthMonth: string;

  constructor(
    private routerStateService: RouterStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const styleImageId = this.activatedRoute.snapshot.queryParamMap.get(
      'styleImageId'
    );
    if (!styleImageId) {
      this.router.navigateByUrl('/styles-selection');
      return;
    }
    const selectedStyleImage = styleImages.find(
      (styleImage) => styleImage.id === styleImageId
    );
    if (!selectedStyleImage) {
      this.router.navigateByUrl('/styles-selection');
      return;
    }
    this.selectedStyleImage = selectedStyleImage;
    this.initPreviewSwiper();
  }

  initPreviewSwiper() {
    const swiper = new Swiper('.swiper-preview', {
      slidesPerView: 1,
      autoplay: {
        delay: 4000,
      },
      observer: true,
    });
  }

  onSubmitForm(submitEvent: Event) {
    submitEvent.preventDefault();
    this.routerStateService.state = {
      petName: this.petName,
      petBirthMonth: this.petBirthMonth,
      selectedFile: this.selectedFile,
    };
    this.router.navigate(['summary'], {
      queryParamsHandling: 'preserve',
    });
  }
}
