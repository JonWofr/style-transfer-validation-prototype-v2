import * as firebase from 'firebase/app';

export interface StylizationJob {
  contentImagePublicUrl: string;
  styleName: string;
  email: string;
  status: 'PENDING' | 'COMPLETED';
  creationDate: firebase.default.firestore.Timestamp;
}
