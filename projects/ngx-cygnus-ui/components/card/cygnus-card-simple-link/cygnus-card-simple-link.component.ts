import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TW_CLASS } from '../const/tailwind.const';
import { NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { CygnusButtonLinkComponent } from 'ngx-cygnus-ui/components/button';

@Component({
  selector: 'cygnus-card-simple-link',
  imports: [
    NgxCygnusIconsComponent,
    CygnusButtonLinkComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-card-simple-link.component.html',
})
export class CygnusCardSimpleLinkComponent {
  TW_CLASS = TW_CLASS;
  cardTitle = input<string>('');
  cardSubtitle = input<string>('');
  cardText = input<string>('');
  cardLinkText = input<string>('');

  readonly clicked = output<boolean>();

  notifyClick() {
    this.clicked.emit(true);
  }
}
