import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TW_CLASS } from '../const/tailwind.const';

import { NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';

@Component({
  selector: 'cygnus-card-title-text',
  imports: [
    NgxCygnusIconsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-card-title-text.component.html',
})
export class CygnusCardTitleTextComponent {
  TW_CLASS = TW_CLASS;
  cardTitle = input<string>('');
  cardIcon = input<string>('');
  sizeTitle = input<string>('');
  borderNone = input<boolean>(false);
  textCenter = input<boolean>(false);
  tailwindClases = input<string>('bg-white hover:bg-gray-100');
}
