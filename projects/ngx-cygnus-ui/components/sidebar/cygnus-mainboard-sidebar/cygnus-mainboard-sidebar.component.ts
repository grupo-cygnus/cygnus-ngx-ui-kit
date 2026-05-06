import { ChangeDetectionStrategy, Component, effect, input, model, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CygnusButtonComponent } from 'ngx-cygnus-ui/components/button';
import { SidebarItem } from 'ngx-cygnus-ui/interfaces';

@Component({
  selector: 'cygnus-mainboard-sidebar',
  imports: [
    CygnusButtonComponent,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-mainboard-sidebar.component.html',
})
export class CygnusMainboardSidebarComponent {
  buttonSidebarArr = input<SidebarItem[]>();
  closeMainboardToggle = model<boolean>(false);

  closeMainboard() {
    this.closeMainboardToggle.update( current => !current );
  }
}
