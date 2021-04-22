import * as firebase from 'firebase/app';

export interface StylizationJob {
  contentImagePublicUrl: string;
  styleImageName: string;
  email: string;
  status: 'PENDING' | 'COMPLETED';
  creationDate: firebase.default.firestore.Timestamp;
  petName: string;
  petBirthMonth: string;
}
