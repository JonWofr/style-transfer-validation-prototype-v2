import { Component, OnInit } from '@angular/core';
import * as ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-landing-page-template',
  templateUrl: './landing-page-template.component.html',
  styleUrls: ['./landing-page-template.component.scss'],
})
export class LandingPageTemplateComponent implements OnInit {
  ngOnInit(): void {
    const scrollReveal = ScrollReveal();
    scrollReveal.reveal('.feature', {
      duration: 600,
      distance: '20px',
      easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      origin: 'right',
      viewFactor: 0.2,
    });
  }
}
