import { DocumentReference } from '@angular/fire/firestore';
import { StylizationJob } from './stylization-job.model';

export interface StylizedImage {
  stylizationJob: DocumentReference<StylizationJob>;
  publicUrl: string;
  userReaction?: 'Love it!' | 'Yes' | "It's okay";
  analytics: {
    hasShared?: boolean;
    hasDownloaded?: boolean;
  };
  personalQuote: {
    title: string;
    text: string;
  };
}
