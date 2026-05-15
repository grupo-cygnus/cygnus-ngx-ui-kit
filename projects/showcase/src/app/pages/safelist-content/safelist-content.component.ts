import { Component } from '@angular/core';

import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-safelist-content',
  imports: [
    Highlight, HighlightLineNumbers,
  ],
  templateUrl: './safelist-content.component.html',
  styleUrl: './safelist-content.component.scss'
})
export class SafelistContentComponent {
  safelistExample: string = `
    <!-- Safelist: List utilities para Tailwind 4 -->
      <div class="hidden">

        <!-- list-style-type -->
        <div class="list-none list-disc list-decimal list-circle list-square list-decimal-leading-zero list-lower-roman list-upper-roman list-lower-alpha list-upper-alpha list-lower-latin list-upper-latin list-lower-greek"></div>

        <!-- list-style-type responsive -->
        <div class="sm:list-none sm:list-disc sm:list-decimal sm:list-circle sm:list-square sm:list-decimal-leading-zero sm:list-lower-roman sm:list-upper-roman sm:list-lower-alpha sm:list-upper-alpha sm:list-lower-latin sm:list-upper-latin sm:list-lower-greek"></div>
        <div class="md:list-none md:list-disc md:list-decimal md:list-circle md:list-square md:list-decimal-leading-zero md:list-lower-roman md:list-upper-roman md:list-lower-alpha md:list-upper-alpha md:list-lower-latin md:list-upper-latin md:list-lower-greek"></div>
        <div class="lg:list-none lg:list-disc lg:list-decimal lg:list-circle lg:list-square lg:list-decimal-leading-zero lg:list-lower-roman lg:list-upper-roman lg:list-lower-alpha lg:list-upper-alpha lg:list-lower-latin lg:list-upper-latin lg:list-lower-greek"></div>
        <div class="xl:list-none xl:list-disc xl:list-decimal xl:list-circle xl:list-square xl:list-decimal-leading-zero xl:list-lower-roman xl:list-upper-roman xl:list-lower-alpha xl:list-upper-alpha xl:list-lower-latin xl:list-upper-latin xl:list-lower-greek"></div>
        <div class="2xl:list-none 2xl:list-disc 2xl:list-decimal 2xl:list-circle 2xl:list-square 2xl:list-decimal-leading-zero 2xl:list-lower-roman 2xl:list-upper-roman 2xl:list-lower-alpha 2xl:list-upper-alpha 2xl:list-lower-latin 2xl:list-upper-latin 2xl:list-lower-greek"></div>

        <!-- list-style-position -->
        <div class="list-inside list-outside"></div>

        <!-- list-style-position responsive -->
        <div class="sm:list-inside sm:list-outside"></div>
        <div class="md:list-inside md:list-outside"></div>
        <div class="lg:list-inside lg:list-outside"></div>
        <div class="xl:list-inside xl:list-outside"></div>
        <div class="2xl:list-inside 2xl:list-outside"></div>

        <!-- list-style-image -->
        <div class="list-image-none"></div>
        <div class="sm:list-image-none"></div>
        <div class="md:list-image-none"></div>
        <div class="lg:list-image-none"></div>
        <div class="xl:list-image-none"></div>
        <div class="2xl:list-image-none"></div>

      </div>
  `;
}
