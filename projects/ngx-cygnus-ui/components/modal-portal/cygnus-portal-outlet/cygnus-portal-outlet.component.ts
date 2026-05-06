import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { PortalService } from 'ngx-cygnus-ui/services';

@Component({
  selector: 'cygnus-portal-outlet',
  imports: [
    PortalModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (portalService.activePortal()) {
      <div class="fixed inset-0 z-[9999] pointer-events-none">
        <ng-template [cdkPortalOutlet]="portalService.activePortal()"></ng-template>
      </div>
    }
  `
})
export class CygnusPortalOutletComponent {
  portalService = inject(PortalService);
}
