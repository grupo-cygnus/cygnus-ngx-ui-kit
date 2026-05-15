import { Component } from '@angular/core';
import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';
import { CygnusModalComponent, CygnusModalTwoNgContentComponent } from 'ngx-cygnus-ui/components/modal';
import { CygnusCustomTableComponent } from 'ngx-cygnus-ui/components/table';

import * as EMPRESAS from '../../../json/EMPRESAS.json';

import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-modal-content',
  imports: [
    CygnusButtonComponent,
    CygnusModalComponent,
    CygnusModalTwoNgContentComponent,
    CygnusCustomTableComponent,
    Highlight, HighlightLineNumbers,
  ],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.scss'
})
export class ModalContentComponent {
  showModalSimple: boolean = false;
  showModalEquis : boolean = false;
  showModalContenido : boolean = false;
  showModalTwoNgContent : boolean = false;
  withX : boolean = true;

  toggleModalSimple():void {
    this.showModalSimple = !this.showModalSimple;
  }
  toggleModalEquis():void {
    this.showModalEquis = !this.showModalEquis;
  }

  toggleModalContenido():void {
    this.showModalContenido = !this.showModalContenido;
  }

  toggleModalTwoNgContent():void {
    this.showModalTwoNgContent = !this.showModalTwoNgContent;
  }

  EMPRESAS = JSON.parse(JSON.stringify(EMPRESAS)).default;

  empresasEditArr: string[] = [
    'NOMBRE DE FANTASIA', 'EMAIL', 'DIRECCION',
  ];

  showEditedData(data: any) {
    console.log('showEditedData: ', data);
  };

  sendData():void {
    console.log('sendData ');
    this.toggleModalContenido();
  }

  cygnusModalImportTs: string = `
    import { Component } from '@angular/core';
    import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';
    import { CygnusModalComponent } from 'ngx-cygnus-ui/components/modal';

    @Component({
      selector: 'app-modal-component',
      imports: [
        CygnusButtonComponent,
        CygnusModalComponent
      ],
      templateUrl: './app-modal-component.component.html',
      styleUrl: './app-modal-component.component.scss'
    })
    export class AppModalComponentComponent {}
  `;

  cygnusModalBooleanTs: string = `
    ...
    export class AppModalComponentComponent {
      showModalSimple: boolean = false;
      showModalEquis : boolean = false;

      toggleModalSimple():void {
        this.showModalSimple = !this.showModalSimple;
      }
      toggleModalEquis():void {
        this.showModalEquis = !this.showModalEquis;
      }
    }
  `;

  cygnusModalSimpleTs: string = `
    import { Component } from '@angular/core';
    import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';
    import { CygnusModalComponent } from 'ngx-cygnus-ui/components/modal';

    @Component({
      selector: 'app-modal-component',
      imports: [
        CygnusButtonComponent,
        CygnusModalComponent
      ],
      templateUrl: './app-modal-component.component.html',
      styleUrl: './app-modal-component.component.scss'
    })
    export class AppModalComponentComponent {
      showModalSimple: boolean = false;

      toggleModalSimple():void {
        this.showModalSimple = !this.showModalSimple;
      }
    }
  `;

  cygnusModalEquisTs: string = `
    import { Component } from '@angular/core';
    import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';
    import { CygnusModalComponent } from 'ngx-cygnus-ui/components/modal';

    @Component({
      selector: 'app-modal-component',
      imports: [
        CygnusButtonComponent,
        CygnusModalComponent
      ],
      templateUrl: './app-modal-component.component.html',
      styleUrl: './app-modal-component.component.scss'
    })
    export class AppModalComponentComponent {
      showModalEquis : boolean = false;

      toggleModalEquis():void {
        this.showModalEquis = !this.showModalEquis;
      }
    }
  `;

  cygnusModalHtml: string = `
    <cygnus-button [btnTypes]="'btn-primary'" (click)="toggleModalSimple()" >Abrir Modal</cygnus-button>

    <cygnus-modal
      [modalTitle]="'Esta es una simple Modal'"
      [(showModal)]="showModalSimple"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit nemo pariatur
      reiciendis voluptates repellendus, eum sunt architecto quam praesentium?
      Nesciunt velit consequatur reiciendis expedita natus, hic veniam quisquam quam
      dolorum. HOLI HOLI
    </cygnus-modal>
  `;

  cygnusModalEquisHtml: string = `
    <cygnus-button [btnTypes]="'btn-primary'" (click)="toggleModalEquis()" >Abrir Modal</cygnus-button>

    <cygnus-modal
      [modalTitle]="'Esta es una simple Modal'"
      [(showModal)]="showModalEquis"
      [withX]="true"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit nemo pariatur
      reiciendis voluptates repellendus, eum sunt architecto quam praesentium?
      Nesciunt velit consequatur reiciendis expedita natus, hic veniam quisquam quam
      dolorum.
    </cygnus-modal>
  `;

  showModalContenidoHtml: string = `
    <cygnus-button [btnTypes]="'btn-primary'" (click)="toggleModalContenido()" >Abrir Modal</cygnus-button>

    <cygnus-modal
      [modalTitle]="'Modal con contenido'"
      [(showModal)]="showModalContenido"
    >
      <!-- COMPONENTE: cygnus-custom-table -->
      @if (EMPRESAS) {
        <cygnus-custom-table
          [dataTable]="EMPRESAS"
          [tableType]="'stripped-hover'"
          [tdEditArr]="empresasEditArr"
          (emitModifiedData)="showEditedData($event)"
          [showSearch]="false"
        />
      }
    </cygnus-modal>
  `;

  showModalContenidoTs: string = `
    import { Component } from '@angular/core';
    import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';
    import { CygnusModalComponent } from 'ngx-cygnus-ui/components/modal';
    import { CygnusCustomTableComponent } from 'ngx-cygnus-ui/components/table';

    import * as EMPRESAS from '../../../json/EMPRESAS.json';

    @Component({
      selector: 'app-modal-content',
      imports: [
        CygnusButtonComponent,
        CygnusModalComponent,
        CygnusCustomTableComponent,
      ],
      templateUrl: './modal-content.component.html',
      styleUrl: './modal-content.component.scss'
    })
    export class ModalContentComponent {

      // código para gestionar el modal
      showModalContenido : boolean = false;
      toggleModalContenido():void {
        this.showModalContenido = !this.showModalContenido;
      }

      // código para gestionar la tabla que se encuentra dentro del modal
      EMPRESAS = JSON.parse(JSON.stringify(EMPRESAS)).default;
      empresasEditArr: string[] = [
        'NOMBRE DE FANTASIA', 'EMAIL', 'DIRECCION',
      ];
      showEditedData(data: any) {
        console.log('showEditedData: ', data);
      };
    }
  `;

  showModalTwoNgContentTs: string = `
    import { Component } from '@angular/core';
    import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';
    import { CygnusModalTwoNgContentComponent } from 'ngx-cygnus-ui/components/modal';

    @Component({
      selector: 'app-modal-content',
      imports: [
        CygnusButtonComponent,
        CygnusModalTwoNgContentComponent,
      ],
      templateUrl: './modal-content.component.html',
      styleUrl: './modal-content.component.scss'
    })
    export class ModalContentComponent {

      showModalTwoNgContent : boolean = false;
      withX : boolean = true;

      toggleModalTwoNgContent():void {
        this.showModalTwoNgContent = !this.showModalTwoNgContent;
      }
    }
  `;

  showModalTwoNgContentHtml: string = `
    <div class="flex items-center justify-center w-full gap-4 mb-4">

      <cygnus-button [btnTypes]="'btn-primary'" (click)="toggleModalTwoNgContent()" >Abrir Modal</cygnus-button>

      <cygnus-modal-two-ng-content
        [(showModal)]="showModalTwoNgContent"
        [withX]="withX"
        [inputMaxW]="'max-w-lg'"
      >
        <div modal-title class="flex">
          Título personalizado&NonBreakingSpace;
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <rect width="30" height="30" style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9" />
          </svg>
        </div>
        <div modal-content class="max-w-lg">
          <p class="pt-4 pb-2">
            Contenido personalizado.
          </p>
        </div>
      </cygnus-modal-two-ng-content>

    </div>
  `;

}
