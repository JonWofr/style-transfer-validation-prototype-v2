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
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { StylizedImage } from 'src/app/shared/models/stylized-image.model';
import { CollectionConverterService } from 'src/app/shared/services/collection-converter/collection-converter.service';
import { StylizationJob } from 'src/app/shared/models/stylization-job.model';

SwiperCore.use([Thumbs, Controller, Autoplay, EffectCoverflow, Pagination]);

@Component({
  selector: 'app-mug-preview',
  templateUrl: './mug-preview.component.html',
  styleUrls: ['./mug-preview.component.scss'],
})
export class MugPreviewComponent implements OnInit {
  stylizedImagesCollection = this.firestore
    .collection('stylized-images-v2')
    .ref.withConverter(
      this.collectionConverterService.createCollectionConverter<StylizedImage>()
    );

  stylizedImageDocumentReference?: DocumentReference<StylizedImage>;
  stylizedImage?: StylizedImage;
  stylizationJob?: StylizationJob;

  petName: string;
  petBirthMonth: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private collectionConverterService: CollectionConverterService,
    private firestore: AngularFirestore
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.activatedRoute.snapshot.queryParamMap.has('stylizedImageId')) {
      this.router.navigateByUrl('/');
    }
    const stylizedImageId =
      this.activatedRoute.snapshot.queryParamMap.get('stylizedImageId');
    const stylizedImageDocument = await this.stylizedImagesCollection
      .doc(stylizedImageId)
      .get();
    if (!stylizedImageDocument.exists) {
      this.router.navigateByUrl('/');
    }
    this.stylizedImageDocumentReference = stylizedImageDocument.ref;
    this.stylizedImage = stylizedImageDocument.data();
    const stylizationJobDocument =
      await this.stylizedImage.stylizationJob.get();
    this.stylizationJob = stylizationJobDocument.data();
  }

  initPreviewSwiper() {
    new Swiper('.swiper-preview', {
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

  onSubmitForm(submitEvent: Event) {
    submitEvent.preventDefault();
    this.router.navigate(['checkout'], {
      queryParamsHandling: 'merge',
      queryParams: {
        petName: this.petName,
        petBirthMonth: this.petBirthMonth,
      },
    });
  }
}
