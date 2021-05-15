import { Injectable } from '@angular/core';
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CollectionConverterService {
  constructor() {}

  createCollectionConverter<T>() {
    const collectionConverter: firebase.default.firestore.FirestoreDataConverter<T> =
      {
        toFirestore(modelObject: T): DocumentData {
          return modelObject as DocumentData;
        },
        fromFirestore(
          snapshot: QueryDocumentSnapshot<DocumentData>,
          options: SnapshotOptions
        ): T {
          return snapshot.data(options) as T;
        },
      };
    return collectionConverter;
  }
}
