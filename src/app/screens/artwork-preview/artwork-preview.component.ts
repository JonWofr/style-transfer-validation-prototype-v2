import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { StylizedImage } from 'src/app/shared/models/stylized-image.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { CollectionConverterService } from 'src/app/shared/services/collection-converter/collection-converter.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';

declare const fbq: Function;

@Component({
  selector: 'app-artwork-preview',
  templateUrl: './artwork-preview.component.html',
  styleUrls: ['./artwork-preview.component.scss'],
})
export class ArtworkPreviewComponent implements OnInit {
  stylizedImagesCollection = this.firestore
    .collection('stylized-images-v2')
    .ref.withConverter(
      this.collectionConverterService.createCollectionConverter<StylizedImage>()
    );

  stylizedImageDocumentReference?: DocumentReference<StylizedImage>;
  stylizedImage?: StylizedImage;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private httpClient: HttpClient,
    private collectionConverterService: CollectionConverterService,
    private analytics: AngularFireAnalytics
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
  }

  async onChangeDoesLike(doesLike: boolean) {
    await this.stylizedImageDocumentReference.set(
      { doesLike },
      { merge: true }
    );
    this.stylizedImage.doesLike = doesLike;
  }

  // Programmatic download is necessary because browsers prohibit a tags with the download attribute from downloading from a different orign (CORS)
  async downloadStylizedImage() {
    try {
      const downloadUrl = await this.storage
        .refFromURL(this.stylizedImage.publicUrl)
        .getDownloadURL()
        .toPromise();

      const stylizedImage = await this.httpClient
        .get(downloadUrl, { responseType: 'blob' })
        .toPromise();
      const fileReader = new FileReader();
      fileReader.addEventListener(
        'load',
        (event: ProgressEvent<FileReader>) => {
          const aElement = document.createElement('a');
          aElement.setAttribute('href', event.target.result as string);
          const urlParts = this.stylizedImage.publicUrl.split('/');
          aElement.setAttribute('download', urlParts[urlParts.length - 1]);
          aElement.click();
          this.analytics.logEvent('download_stylized_image');
        }
      );
      fileReader.readAsDataURL(stylizedImage);
    } catch (error) {
      this.analytics.logEvent('exception', {
        description: error,
        fatal: true,
      });
    }
  }
}
