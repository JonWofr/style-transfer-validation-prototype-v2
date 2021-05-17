import { DocumentReference } from '@angular/fire/firestore';
import { StylizationJob } from './stylization-job.model';
import { StylizedImage } from './stylized-image.model';

export interface Order {
  petName: string;
  petBirthMonth: string;
  status: 'PENDING' | 'COMPLETED';
  email: string;
  creationDate: firebase.default.firestore.Timestamp;
  stylizationJob: DocumentReference<StylizationJob>;
  stylizedImage: DocumentReference<StylizedImage>;
  value: number;
  currency: string;
}
