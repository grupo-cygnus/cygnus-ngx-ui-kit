import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CygnusButtonComponent } from 'ngx-cygnus-ui/components/button';
import { TW_CLASS } from '../const/tailwind.const';

@Component({
  selector: 'cygnus-card-image',
  imports: [
    CygnusButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-card-image.component.html',
})
export class CygnusCardImageComponent {
  TW_CLASS = TW_CLASS;

  imgSrc = input<string>('');
  imgAlt = input<string>('');
  cardTitle = input<string>('');
  cardText  = input<string>('');
  cardButtonText = input<string>('');

  readonly clicked = output<boolean>();

  notifyClick() {
    this.clicked.emit(true);
  }
}
