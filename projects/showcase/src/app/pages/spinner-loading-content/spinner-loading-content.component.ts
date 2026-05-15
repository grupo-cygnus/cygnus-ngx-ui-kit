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

}
