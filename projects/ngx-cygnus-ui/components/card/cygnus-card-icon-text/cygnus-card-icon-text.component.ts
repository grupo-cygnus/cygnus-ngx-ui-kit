import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  IconColorText,
  IconTextSize,
  NgxCygnusIconsComponent
} from '@cygnus/ngx-cygnus-icons';
import { TW_CLASS } from '../const/tailwind.const';

@Component({
  selector: 'cygnus-card-icon-text',
  imports: [
    NgxCygnusIconsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-card-icon-text.component.html',
})
export class CygnusCardIconTextComponent {
  TW_CLASS = TW_CLASS;

  iconSize  = input<IconTextSize>('');
  iconColor = input<IconColorText>('secgray');
  iconRoute = input<string>('');
  cardText  = input<string>('');

}
