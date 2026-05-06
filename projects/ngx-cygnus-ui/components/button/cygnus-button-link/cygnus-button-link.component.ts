import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TW_CLASS } from '../const/tailwind.const';
import { BtnLinkType } from 'ngx-cygnus-ui/types';

@Component({
  selector: 'cygnus-button-link',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-button-link.component.html',
})
export class CygnusButtonLinkComponent {
  TW_CLASS = TW_CLASS; // esto fue creado para reemplazar @apply de tailwind, ya la documentación de tailwind 4 recomienda no usar @apply y se dice que no funciona muy bien en angular.

  btnLinkType = input<BtnLinkType>('btn-link');
  btnRouterLinkText = input<string>('');
  paddingOk = input<boolean>(true);
  hrefLink = input<string>('');

  addTailwindClasses(customClass: BtnLinkType): string {
    switch (customClass) {
      case 'btn-link':
        return this.TW_CLASS.BTN_LINK;
      case 'btn-link-simple':
        return this.TW_CLASS.BTN_LINK_SIMPLE;
      case 'btn-link-navbar':
        return this.TW_CLASS.BTN_LINK_NAVBAR;
      default:
        return this.TW_CLASS.BTN_LINK;
    }
  }

  addRouterLinkActiveTailwindClasses(customClass: BtnLinkType): string {
    switch (customClass) {
      case 'btn-link-navbar':
        return this.TW_CLASS.BTN_LINK_NAVBAR_ACTIVE;
      default:
        return this.TW_CLASS.BTN_LINK_NAVBAR_ACTIVE;
    }
  }
}
