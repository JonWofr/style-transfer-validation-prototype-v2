import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare const fbq: Function;
import { RouterOutlet } from '@angular/router';
import { slideInRoutingAnimation } from './app-routing-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  animations: [slideInRoutingAnimation],
})
export class AppComponent {
  title = 'PetAI';

  constructor(router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        fbq('track', 'PageView');
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
