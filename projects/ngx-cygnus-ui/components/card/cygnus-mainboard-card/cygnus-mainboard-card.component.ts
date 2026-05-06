import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconColorText, IconTextSize, NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { CygnusButtonLinkComponent } from 'ngx-cygnus-ui/components/button';

@Component({
  selector: 'cygnus-mainboard-card',
  imports: [
    NgxCygnusIconsComponent,
    CygnusButtonLinkComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-mainboard-card.component.html',
})
export class CygnusMainboardCardComponent {
  // assets/icons/svg/General/speedometer-04.svg
  // assets/icons/svg/General/hearts.svg
  iconLeftColor = input<IconColorText>('lightmediumblue');
  iconLeftAsset = input<string>('assets/icons/svg/General/speedometer-04.svg');
  iconLeftSize  = input<IconTextSize>('xxxxl');

  iconRightColor = input<IconColorText>('yellow');
  iconRightAsset = input<string>('assets/icons/svg/General/hearts.svg');
  iconRightSize  = input<IconTextSize>('');

  iconArrowColor = input<IconColorText>('lightmediumblue');
  iconArrowAsset = input<string>('assets/icons/svg/Arrows/arrow-narrow-right.svg');
  iconArrowSize  = input<IconTextSize>('');

  cardTitle = input<string>('');
  cardText  = input<string>('');
  cardLinkText = input<string>('Ingresar');
  cardLinkClicked = output<boolean>()

  buttonLinkClicked() {
    this.cardLinkClicked.emit(true);
  }

}
