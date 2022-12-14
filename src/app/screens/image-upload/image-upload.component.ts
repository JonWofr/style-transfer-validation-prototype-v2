import { Component, OnInit } from '@angular/core';
import { RouterStateService } from '../../shared/services/router-state/router-state.service';

import SwiperCore, {
  Thumbs,
  Controller,
  Swiper,
  Autoplay,
  EffectCoverflow,
  Pagination,
} from 'swiper/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StyleImage } from 'src/app/shared/models/style-image.model';
import { artPreviews } from 'src/app/shared/raw/art-previews';
import { AngularFireAnalytics } from '@angular/fire/analytics';

SwiperCore.use([Thumbs, Controller, Autoplay, EffectCoverflow, Pagination]);

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  selectedStyleImage: StyleImage;
  selectedFile: File;
  petName: string;
  petBirthMonth: string;
  uploadImgSrc = '';

  constructor(
    private routerStateService: RouterStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private analytics: AngularFireAnalytics
  ) {}

  ngOnInit(): void {
    const styleImageId =
      this.activatedRoute.snapshot.queryParamMap.get('styleImageId');
    if (!styleImageId) {
      this.router.navigateByUrl('/styles-selection');
      return;
    }
    const selectedStyleImage = artPreviews.find(
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
      effect: 'coverflow',
      autoplay: {
        delay: 4000,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      observer: true,
    });
  }

  async onChangeFileInput(file: File) {
    try {
      // If the user clicks on the file input but then selects "cancel" the value of the file input is resetted. The onChange event will still be emitted with value undefined.
      if (!file) {
        this.uploadImgSrc = '';
        this.selectedFile = undefined;
        return;
      }
      this.uploadImgSrc = await this.readFile(file);
      this.selectedFile = file;
      this.analytics.logEvent('upload_button_click');
    } catch (error) {
      console.error(error);
      await this.analytics.logEvent('exception', {
        description: error,
        fatal: true,
      });
      this.router.navigateByUrl('/failure');
    }
  }

  readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        resolve(fileReader.result as string);
      });
      fileReader.addEventListener('error', reject);
      fileReader.readAsDataURL(file);
    });
  }

  onSubmitForm(submitEvent: Event) {
    submitEvent.preventDefault();
    this.routerStateService.state = {
      selectedFile: this.selectedFile,
    };
    this.router.navigate(['summary'], {
      queryParamsHandling: 'preserve',
    });
  }
}
