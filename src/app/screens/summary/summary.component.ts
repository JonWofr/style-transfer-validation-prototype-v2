import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { StylizationJob } from 'src/app/shared/models/stylization-job.model';
import { RouterStateService } from 'src/app/shared/services/router-state/router-state.service';
import { v4 as uuidv4 } from 'uuid';
import * as firebase from 'firebase/app';
import { styleImages } from 'src/app/shared/raw/style-images';
import { StyleImage } from 'src/app/shared/models/style-image.model';
import { AngularFireAnalytics } from '@angular/fire/analytics';

declare const fbq: Function;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  petName: string;
  petBirthMonth: string;
  selectedFile: File;
  imageSrc: string;
  email: string;
  selectedStyleImage: StyleImage;
  shouldShowSpinner = false;

  constructor(
    private routerStateService: RouterStateService,
    private router: Router,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute,
    private analytics: AngularFireAnalytics
  ) {}

  async ngOnInit(): Promise<void> {
    const routerState = this.routerStateService.state;
    if (!routerState) {
      this.router.navigate(['image-upload'], {
        queryParamsHandling: 'preserve',
      });
      return;
    }
    this.petName = routerState.petName;
    this.petBirthMonth = routerState.petBirthMonth;
    this.selectedFile = routerState.selectedFile;
    this.routerStateService.clearState();
    this.imageSrc = await this.readFile(this.selectedFile);

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

  async onSubmitForm(submitEvent: Event) {
    try {
      this.shouldShowSpinner = true;
      submitEvent.preventDefault();
      const contentImagePublicUrl = await this.uploadFile(this.selectedFile);
      await this.createStylizationJobDocument(contentImagePublicUrl);
      this.analytics.logEvent('generate_lead', {
        value: this.selectedStyleImage.name,
      });
      fbq('track', 'Lead', { content_name: this.selectedStyleImage.name });
      this.router.navigate(['success'], {
        queryParams: { userEmail: this.email },
      });
    } catch (error) {
      console.error(error);
      this.router.navigateByUrl('/failure');
    }
  }

  async uploadFile(file: File): Promise<string> {
    const filePath = `v2/content-images/${uuidv4()}`;
    const fileRef = this.storage.ref(filePath);
    await fileRef.put(file);
    const publicUrl = await fileRef.getDownloadURL().toPromise();
    return publicUrl;
  }

  async createStylizationJobDocument(contentImagePublicUrl: string) {
    const stylizationJob: StylizationJob = {
      email: this.email,
      contentImagePublicUrl,
      styleImageName: this.selectedStyleImage.name,
      status: 'PENDING',
      creationDate: firebase.default.firestore.Timestamp.fromMillis(Date.now()),
      petName: this.petName ?? null,
      petBirthMonth: this.petBirthMonth ?? null,
    };
    const documentReference = await this.firestore
      .collection('stylization-jobs-v2')
      .add(stylizationJob);
    return documentReference.id;
  }
}
