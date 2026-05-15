import { Component, signal } from '@angular/core';
import { CygnusLoadingScreenComponent } from 'ngx-cygnus-ui/components/spinner-loading';
import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';

import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-spinner-loading-content',
  imports: [
    CygnusLoadingScreenComponent,
    CygnusButtonComponent,
    Highlight, HighlightLineNumbers,
  ],
  templateUrl: './spinner-loading-content.component.html',
  styleUrl: './spinner-loading-content.component.scss'
})
export class SpinnerLoadingContentComponent {

  showLoadingScreen = signal<boolean>(false);

  openLoadingScreen() {
    this.showLoadingScreen.set(true);
    setTimeout(() => {
      this.showLoadingScreen.set(false);
    }, 5000);
  }

  cygnusLoadingScreenHtml: string = `
    <cygnus-button [btnTypes]="'btn-primary'" (click)="openLoadingScreen()" >Abrir loading-screen</cygnus-button>
    @if (showLoadingScreen()) {
      <cygnus-loading-screen [mostrarTexto]="'Cargando datos...'" />
    }
  `;

  cygnusLoadingScreenTs: string = `
    import { Component, signal } from '@angular/core';
    import { CygnusLoadingScreenComponent } from 'ngx-cygnus-ui/components/spinner-loading';
    import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';

    @Component({
      selector: 'app-spinner-loading-content',
      imports: [
        CygnusLoadingScreenComponent,
        CygnusButtonComponent,
      ],
      templateUrl: './spinner-loading-content.component.html',
      styleUrl: './spinner-loading-content.component.scss'
    })
    export class SpinnerLoadingContentComponent {

      showLoadingScreen = signal<boolean>(false);

      openLoadingScreen() {
        this.showLoadingScreen.set(true);
        setTimeout(() => {
          this.showLoadingScreen.set(false);
        }, 5000);
      }
    }
  `;

  tailwindSpinnerHtml: string = `
    <div class="flex p-4 pb-4">
      <div class="h-12 w-12 animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
      <div class="h-12 w-12 animate-spin border-4 border-gray-300 border-t-success-500 rounded-full"></div>
      <div class="h-12 w-12 animate-spin border-4 border-gray-300 border-t-error-500 rounded-full"></div>
      <div class="h-12 w-12 animate-spin border-4 border-gray-300 border-t-amber-500 rounded-full"></div>
      <div class="h-12 w-12 animate-spin border-4 border-gray-300 border-t-blue-violet-500 rounded-full"></div>
    </div>
    <div class="flex p-4 pb-4">
      <div class="h-8 w-8 animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
      <div class="h-8 w-8 animate-spin border-4 border-gray-300 border-t-success-500 rounded-full"></div>
      <div class="h-8 w-8 animate-spin border-4 border-gray-300 border-t-error-500 rounded-full"></div>
      <div class="h-8 w-8 animate-spin border-4 border-gray-300 border-t-amber-500 rounded-full"></div>
      <div class="h-8 w-8 animate-spin border-4 border-gray-300 border-t-blue-violet-500 rounded-full"></div>
    </div>
  `;

}
