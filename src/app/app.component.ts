import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare const fbq: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(router: Router, storage: AngularFireStorage) {
    storage.storage.setMaxUploadRetryTime(10000);
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        fbq('track', 'PageView');
      });
  }
}
