import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CygnusButtonComponent } from 'ngx-cygnus-ui/components/button';

@Component({
  selector: 'cygnus-collapsible',
  imports: [
    CygnusButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-collapsible.component.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,
})
export class CygnusCollapsibleComponent {
  toggleIsOpen = signal<boolean>(false);

  btnType = input<string>('btn-primary btn-icon');
  btnIconAssetLeft = input<string>('');
  btnIconAssetRight = input<string>('');
  collapsableTitle = input<string>('');

  toggleCollapse() {
    // console.log('toggleCollapse(): ',!this.toggleIsOpen());
    this.toggleIsOpen.update( current => !current );
  }
}
