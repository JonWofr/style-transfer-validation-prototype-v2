import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { StylizationJob } from 'src/app/shared/models/stylization-job.model';
import { RouterStateService } from 'src/app/shared/services/router-state/router-state.service';
import { v4 as uuidv4 } from 'uuid';
import * as firebase from 'firebase/app';
import { styleImages } from 'src/app/shared/raw/style-images';
import { StyleImage } from 'src/app/shared/models/style-image.model';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { StylizedImage } from 'src/app/shared/models/stylized-image';
import { CollectionConverterService } from 'src/app/shared/services/collection-converter/collection-converter.service';

declare const fbq: Function;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  stylizedImagesCollection = this.firestore
    .collection('stylized-images')
    .ref.withConverter(
      this.collectionConverterService.createCollectionConverter<StylizedImage>()
    );

  stylizedImageDocumentReference?: DocumentReference<StylizedImage>;
  stylizedImage?: StylizedImage;
  stylizationJob?: StylizationJob;

  email: string;
  shouldShowSpinner = false;

  constructor(
    private routerStateService: RouterStateService,
    private router: Router,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute,
    private analytics: AngularFireAnalytics,
    private collectionConverterService: CollectionConverterService
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

  async onSubmitForm(submitEvent: Event) {
    try {
      this.shouldShowSpinner = true;
      submitEvent.preventDefault();

      /*       this.analytics.logEvent('generate_lead', {
        value: this.selectedStyleImage.name,
      });
      fbq('track', 'Lead', { content_name: this.selectedStyleImage.name }); */
      this.router.navigate(['success'], {
        queryParams: { userEmail: this.email },
      });
    } catch (error) {
      console.error(error);
      this.router.navigateByUrl('/failure');
    }
  }
}
