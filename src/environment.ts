// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendApi: 'http://localhost:5001/petai-bdd53/europe-west3/api',
  firebaseConfig: {
    apiKey: 'AIzaSyA49twQf7SaLXhczaWgru-23X_bj4PHKyU',
    authDomain: 'petai-bdd53.firebaseapp.com',
    projectId: 'petai-bdd53',
    storageBucket: 'petai-bdd53.appspot.com',
    messagingSenderId: '878131096273',
    appId: '1:878131096273:web:a27e43c79afcdd0fdd33f0',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
