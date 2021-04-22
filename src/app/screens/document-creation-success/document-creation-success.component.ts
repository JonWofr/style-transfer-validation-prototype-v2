import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-creation-success',
  templateUrl: './document-creation-success.component.html',
  styleUrls: ['./document-creation-success.component.scss'],
})
export class DocumentCreationSuccess implements OnInit {
  userEmail: string = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.userEmail = this.activatedRoute.snapshot.queryParamMap.get(
      'userEmail'
    );
  }
}
