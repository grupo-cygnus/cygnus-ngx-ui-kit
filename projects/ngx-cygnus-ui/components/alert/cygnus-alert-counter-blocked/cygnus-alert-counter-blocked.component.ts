import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { IconColorText, NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { TW_CLASS } from '../const/tailwind.const';
import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';

@Component({
  selector: 'cygnus-alert-counter-blocked',
  imports: [
    NgxCygnusIconsComponent,
    CygnusButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-alert-counter-blocked.component.html',
})
export class CygnusAlertCounterBlockedComponent {
  TW_CLASS = TW_CLASS;
  readonly maxCounter = 3;

  // Inputs
  tryCounter = input<number>(0);
  alertIconAsset = input<string>('assets/icons/svg/Alerts&Feedback/alert-circle.svg');

  // Outputs
  btnAlertIsClickedEvent = output<boolean>();

  // --- 1. Estado Base: Toda la lógica de negocio depende de tryCounter ---
  private state = computed(() => {
    const count = this.tryCounter();

    if (count === 0) return { show: false };

    if (count > 0 && count < this.maxCounter) {
      const remaining = this.maxCounter - count;
      return {
        show: true,
        type: 'alert-yellow',
        withBtn: false,
        title: 'Alerta de bloqueo de cuenta',
        content: `Has hecho “${count}” ${this.plural(count)} de inicio de sesión. Tienes ${remaining} ${this.plural(remaining)} más, si no, se bloqueará tu cuenta.`,
        color: 'amber' as IconColorText,
        btn: 'btn-warning'
      };
    }

    // Bloqueado (count >= 3)
    return {
      show: true,
      type: 'alert-red',
      withBtn: true,
      title: 'Bloqueo de cuenta',
      content: `Tu cuenta ha sido bloqueada por “${count}” cantidad de intentos fallidos. Espera 30 minutos o comunícate con recursos humanos.`,
      color: 'red' as IconColorText,
      btn: 'btn-error'
    };
  });

  // --- 2. Signals Derivados para la Vista ---
  showAlert = computed(() => this.state().show);
  alertWithBtn = computed(() => this.state().withBtn ?? false);
  alertTitle = computed(() => this.state().title ?? '');
  alertContent = computed(() => this.state().content ?? '');
  alertIconColor = computed(() => this.state().color ?? 'blue');
  buttonType = computed(() => this.state().btn ?? '');
  btnFullText = signal<string>('Aceptar'); // Este puede seguir siendo signal si no cambia

  // --- 3. Clases de Tailwind (Reactivo al cambio de tema/estado) ---
  alertAllClasses = computed(() => {
    const s = this.state();
    if (!s.show) return '';

    if (s.type === 'alert-red') {
      return s.withBtn ? this.TW_CLASS.ALERT_CONTENT_FULL_RED : this.TW_CLASS.ALERT_CONTENT_RED;
    }
    return s.withBtn ? this.TW_CLASS.ALERT_CONTENT_FULL_YELLOW : this.TW_CLASS.ALERT_CONTENT_YELLOW;
  });

  // Helpers
  private plural = (n: number) => n === 1 ? 'intento' : 'intentos';

  alertWithBtnClick() {
    this.btnAlertIsClickedEvent.emit(true);
  }
}
