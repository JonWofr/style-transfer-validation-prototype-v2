import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { StylizationJob } from 'src/app/shared/models/stylization-job.model';
import { RouterStateService } from 'src/app/shared/services/router-state/router-state.service';
import { v4 as uuidv4 } from 'uuid';
import * as firebase from 'firebase/app';

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

  constructor(
    private routerStateService: RouterStateService,
    private router: Router,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  async ngOnInit(): Promise<void> {
    const routerState = this.routerStateService.state;
    if (!routerState) {
      this.router.navigateByUrl('/product-detail');
      return;
    }
    this.routerStateService.clearState();
    this.petName = routerState.petName;
    this.petBirthMonth = routerState.petBirthMonth;
    this.selectedFile = routerState.selectedFile;

    this.imageSrc = await this.readFile(this.selectedFile);
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
    submitEvent.preventDefault();
    const contentImagePublicUrl = await this.uploadFile(this.selectedFile);
    await this.createStylizationJobDocument(contentImagePublicUrl);
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
      styleName: '',
      status: 'PENDING',
      creationDate: firebase.default.firestore.Timestamp.fromMillis(Date.now()),
    };
    const documentReference = await this.firestore
      .collection('stylization-jobs-v2')
      .add(stylizationJob);
    return documentReference.id;
  }
}
