import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterStateService } from 'src/app/shared/services/router-state/router-state.service';
import * as firebase from 'firebase/app';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { StylizedImage } from 'src/app/shared/models/stylized-image.model';
import { CollectionConverterService } from 'src/app/shared/services/collection-converter/collection-converter.service';
import { Order } from 'src/app/shared/models/order.models';

declare const fbq: Function;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  stylizedImagesCollection = this.firestore
    .collection('stylized-images-v2')
    .ref.withConverter(
      this.collectionConverterService.createCollectionConverter<StylizedImage>()
    );

  ordersCollection = this.firestore
    .collection('orders-v2')
    .ref.withConverter(
      this.collectionConverterService.createCollectionConverter<Order>()
    );

  stylizedImageDocumentReference?: DocumentReference<StylizedImage>;
  stylizedImage?: StylizedImage;

  email: string = '';
  shouldShowSpinner = false;

  petName: string;
  petBirthMonth: string;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
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
    const stylizationJob = stylizationJobDocument.data();
    this.email = stylizationJob.email;
    this.petName = this.activatedRoute.snapshot.queryParamMap.get('petName');
    this.petBirthMonth =
      this.activatedRoute.snapshot.queryParamMap.get('petBirthMonth');
  }

  async onSubmitForm(submitEvent: Event) {
    try {
      this.shouldShowSpinner = true;
      submitEvent.preventDefault();
      await this.createOrderDocument();
      this.analytics.logEvent('purchase', {
        value: 19.99,
        currency: 'GBP',
      });
      fbq('track', 'Purchase', { value: 19.99, currency: 'GBP' });
      this.router.navigate(['thank-you'], {
        queryParams: { userEmail: this.email },
      });
    } catch (error) {
      this.analytics.logEvent('exception', {
        description: error,
        fatal: true,
      });
      this.router.navigateByUrl('/failure');
    }
  }

  async createOrderDocument() {
    const order: Order = {
      petName: this.petName ?? null,
      petBirthMonth: this.petBirthMonth ?? null,
      email: this.email,
      status: 'PENDING',
      creationDate: firebase.default.firestore.Timestamp.fromMillis(Date.now()),
      stylizationJob: this.stylizedImage.stylizationJob,
      stylizedImage: this.stylizedImageDocumentReference,
      value: 19.99,
      currency: 'GBP',
    };
    const documentReference = await this.ordersCollection.add(order);
    return documentReference.id;
  }
}
