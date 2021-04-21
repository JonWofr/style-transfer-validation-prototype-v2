import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouterStateService {
  public state: any;

  constructor() {}

  clearState() {
    this.state = undefined;
  }
}
