import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { StylizedImage } from 'src/app/shared/models/stylized-image.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { CollectionConverterService } from 'src/app/shared/services/collection-converter/collection-converter.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { FileDownloadMetadata } from 'src/app/shared/models/file-download-metadata.model';
import { UserReaction } from 'src/app/shared/enums/user-reaction.enum';

// The navigator API seems to not have a complete type definition yet
declare const navigator: any;

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
  isSharingApiSupported = false;
  UserReaction = UserReaction;

  data = '';

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  tempCanvas = document.createElement('canvas');
  tctx = this.tempCanvas.getContext('2d');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private httpClient: HttpClient,
    private collectionConverterService: CollectionConverterService,
    private analytics: AngularFireAnalytics
  ) {}

  download() {
    var data = this.generateArtworkData(0.4);
    const aElement = document.createElement('a');
    aElement.setAttribute('href', data as string);
    aElement.setAttribute('download', 'test.jpeg');
    aElement.click();
  }

  generateArtworkData(quality: number): string {
    const canvasRef = this.canvas.nativeElement;
    var cw = canvasRef.width;
    var ch = canvasRef.height;
    this.tempCanvas.width = cw * quality;
    this.tempCanvas.height = ch * quality;
    this.tctx.drawImage(
      canvasRef,
      0,
      0,
      cw,
      ch,
      0,
      0,
      cw * quality,
      ch * quality
    );
    return this.tempCanvas.toDataURL('image/jpeg');
  }

  initCanvas(imageUrl: string) {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    var img = new Image();
    img.onload = () => {
      this.ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height, // source rectangle
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
      this.ctx.font = 100 + 'px Arial';
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.fillText('@paintable-paws.com', 30, 750);
    };

    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    this.canvas.nativeElement.oncontextmenu = function () {
      return false;
    };
  }

  async ngOnInit(): Promise<void> {
    try {
      if (!this.activatedRoute.snapshot.queryParamMap.has('stylizedImageId')) {
        this.router.navigateByUrl('/');
        return;
      }
      const stylizedImageId =
        this.activatedRoute.snapshot.queryParamMap.get('stylizedImageId');
      const stylizedImageDocument = await this.stylizedImagesCollection
        .doc(stylizedImageId)
        .get();
      if (!stylizedImageDocument.exists) {
        this.router.navigateByUrl('/');
        return;
      }
      this.stylizedImageDocumentReference = stylizedImageDocument.ref;
      this.stylizedImage = stylizedImageDocument.data();

      this.initCanvas(this.stylizedImage.publicUrl);

      this.isSharingApiSupported = navigator.share !== undefined;
      this.stylizedImageDocumentReference.update({
        'analytics.hasViewed': true,
        'analytics.isSharingApiSupported': this.isSharingApiSupported,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async onChangeUserReaction(userReaction: 'Love it!' | 'Yes' | "It's okay") {
    try {
      await this.stylizedImageDocumentReference.update({ userReaction });
      this.stylizedImage.userReaction = userReaction;
    } catch (error) {
      this.handleError(error);
    }
  }

  onClickDonateButton() {
    try {
      this.stylizedImageDocumentReference.update({
        'analytics.hasClickedDonateButton': true,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  // The share button will only be displayed when the share API is available
  async onClickShareButton() {
    try {
      const shareData = {
        title: 'My pawsome work of art! 🎨',
        url: 'https://paintable-paws.com',
      };

      // Checks if file sharing is supported
      if (navigator.canShare) {
        const [stylizedImageBlob, metadata] =
          await this.downloadStylizedImage();
        console.log('can share files');
        console.log(metadata);
        const stylizedImageFile = new File([stylizedImageBlob], metadata.name, {
          type: metadata.contentType,
        });
        // Checks if the file to be shared is invalid
        if (!navigator.canShare({ files: [stylizedImageFile] })) {
          throw new Error('Invalid file');
        }
        shareData['text'] =
          'Paintable Paws created this unique work of art for me. Head over to their website to get your own purrfect piece. 🐾';
        shareData['files'] = [stylizedImageFile];
      } else {
        shareData['text'] =
          'Paintable Paws created this unique work of art for me. Head over to their website to get your own purrfect piece. 🐾';
      }

      await navigator.share(shareData);
      this.stylizedImageDocumentReference.update({
        'analytics.hasShared': true,
      });
      this.analytics.logEvent('share');
    } catch (error) {
      this.handleError(error);
    }
  }

  async onClickDownloadButton() {
    try {
      /*       const [stylizedImageBlob, metadata] = await this.downloadStylizedImage();
      const fileReader = new FileReader();
      fileReader.addEventListener(
        'load',
        (event: ProgressEvent<FileReader>) => {
          const aElement = document.createElement('a');
          aElement.setAttribute('href', event.target.result as string);
          aElement.setAttribute('download', metadata.name);
          aElement.setAttribute('target', '_blank');
          aElement.click();
          this.stylizedImageDocumentReference.update({
            'analytics.hasDownloaded': true,
          });
          this.analytics.logEvent('download_stylized_image');
        }
      );
      fileReader.readAsDataURL(
        new Blob([stylizedImageBlob], { type: metadata.contentType })
      ); */
      this.stylizedImageDocumentReference.update({
        'analytics.hasDownloaded': true,
      });
      this.analytics.logEvent('download_stylized_image');
    } catch (error) {
      this.handleError(error);
    }
  }

  // Programmatic download is necessary because browsers prohibit a tags with the download attribute from downloading from a different orign (CORS)
  async downloadStylizedImage(): Promise<[Blob, FileDownloadMetadata]> {
    const fileRef = this.storage.refFromURL(this.stylizedImage.publicUrl);
    const downloadUrl = await fileRef.getDownloadURL().toPromise();
    const metadata = await fileRef
      .getMetadata()
      .toPromise<FileDownloadMetadata>();
    const stylizedImageBlob = await this.httpClient
      .get(downloadUrl, { responseType: 'blob' })
      .toPromise();
    console.log(stylizedImageBlob);
    return [stylizedImageBlob, metadata];
  }

  async handleError(error) {
    console.error(error);
    await this.analytics.logEvent('exception', {
      description: error,
      fatal: true,
    });
    this.router.navigateByUrl('/failure');
  }
}
