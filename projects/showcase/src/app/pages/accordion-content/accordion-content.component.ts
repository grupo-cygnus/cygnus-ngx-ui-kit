import { Component } from '@angular/core';
import { CygnusAccordionComponent } from 'ngx-cygnus-ui/components/accordion';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-accordion-content',
  imports: [
    CygnusAccordionComponent,
    Highlight, HighlightLineNumbers,
  ],
  templateUrl: './accordion-content.component.html',
  styleUrl: './accordion-content.component.scss'
})
export class AccordionContentComponent {
  accordionCodeImport: string = `
    import { Component } from '@angular/core';
    import { CygnusAccordionComponent } from 'ngx-cygnus-ui/components/accordion';

    @Component({
      selector: 'app-component',
      imports: [
        CygnusAccordionComponent,
      ],
      templateUrl: './app-component.component.html',
    })
    export class AppComponentComponent {}
  `;

  accordionHtml: string = `
    <cygnus-accordion [accordionTitle]="'Ingresa acá el título que se mostrará fuera del Accordion'" >
      Ingresa acá el contenido ya sea texto u otros components que se mostrarán dentro del Accordion.
    </cygnus-accordion>
  `;

  accExampleHtml: string = `
    <cygnus-accordion [accordionTitle]="'Acordeón #1'" >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit nemo pariatur
      reiciendis voluptates repellendus, eum sunt architecto quam praesentium?
      Nesciunt velit consequatur reiciendis expedita natus, hic veniam quisquam quam
      dolorum.
    </cygnus-accordion>
  `;
}
