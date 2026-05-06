import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';

@Component({
  selector: 'cygnus-accordion',
  imports: [
    NgxCygnusIconsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-accordion.component.html',
})
export class CygnusAccordionComponent {
  accordionTitle = input<string>('');
  contentShow = signal<boolean>(false);

  toggleAccordion() {
    this.contentShow.update( current => !current );
  }
}
