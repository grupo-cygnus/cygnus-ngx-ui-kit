import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { CygnusButtonComponent } from 'ngx-cygnus-ui/components/button';

@Component({
  selector: 'cygnus-mainboard-header-navbar',
  imports: [
    CygnusButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-mainboard-header-navbar.component.html',
})
export class CygnusMainboardHeaderNavbarComponent {
  utilities = output<string>();

  utilitiesClicked():void {
    this.utilities.emit('utilities');
  }

}
