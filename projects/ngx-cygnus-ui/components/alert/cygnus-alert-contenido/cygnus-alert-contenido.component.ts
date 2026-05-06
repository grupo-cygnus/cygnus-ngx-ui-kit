import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { IconColorText, NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { TW_CLASS } from '../const/tailwind.const';
import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';

@Component({
  selector: 'cygnus-alert-contenido',
  imports: [
    NgxCygnusIconsComponent,
    CygnusButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-alert-contenido.component.html',
})
export class CygnusAlertContenidoComponent {
  TW_CLASS = TW_CLASS;
  showAlert = signal<boolean>(true);

  // Inputs
  alertWithBtn = input<boolean>(true);
  btnIsFull = input<boolean>(false);
  alertIconAsset = input<string>('assets/icons/svg/Alerts&Feedback/alert-circle.svg');
  alertTitle = input<string>('');
  alertContent = input<string>('');
  btnFullText = input<string>('Aceptar');
  alertTypes = input<string>('');
  isRounded = input<boolean>(true);

  // Outputs
  btnClickedEvent = output<boolean>();

  // --- Lógica Computada Centralizada ---

  /**
   * Creamos un estado derivado que procesa el string de alertTypes.
   * Esto evita repetir switches innecesarios.
   */
  private alertConfig = computed(() => {
    const type = this.alertTypes();

    if (type.includes('alert-red')) {
      return { color: 'red' as IconColorText, btn: 'btn-error', btnOutlined: 'btn-outlined-red', key: 'red' };
    }
    if (type.includes('alert-green')) {
      return { color: 'green' as IconColorText, btn: 'btn-success', btnOutlined: 'btn-outlined-green', key: 'green' };
    }
    if (type.includes('alert-yellow')) {
      return { color: 'amber' as IconColorText, btn: 'btn-warning', btnOutlined: 'btn-outlined-amber', key: 'yellow' };
    }
    if (type.includes('alert-gray')) {
      return { color: 'secgray' as IconColorText, btn: 'btn-full-gray', btnOutlined: 'btn-outlined-gray', key: 'gray' };
    }
    if (type.includes('alert-indigo')) {
      return { color: 'indigo' as IconColorText, btn: 'btn-indigo', btnOutlined: 'btn-outlined-gray', key: 'indigo' };
    }

    // Default (Primary)
    return { color: 'blue' as IconColorText, btn: 'btn-primary', btnOutlined: 'btn-outlined', key: 'primary' };
  });

  // Derivamos los valores individuales de la configuración
  alertIconColor = computed(() => this.alertConfig().color);
  buttonType = computed(() => this.alertConfig().btn);
  buttonOutlinedType = computed(() => this.alertConfig().btnOutlined);

  // Clases dinámicas del contenedor
  alertAllClasses = computed(() => {
    const config = this.alertConfig();
    const isFull = this.btnIsFull();

    // Mapeo directo usando la "key" de la configuración
    const classMap: Record<string, string> = {
      primary: isFull ? this.TW_CLASS.ALERT_CONTENT_FULL_PRIMARY : this.TW_CLASS.ALERT_CONTENT_PRIMARY,
      red:     isFull ? this.TW_CLASS.ALERT_CONTENT_FULL_RED     : this.TW_CLASS.ALERT_CONTENT_RED,
      green:   isFull ? this.TW_CLASS.ALERT_CONTENT_FULL_GREEN   : this.TW_CLASS.ALERT_CONTENT_GREEN,
      yellow:  isFull ? this.TW_CLASS.ALERT_CONTENT_FULL_YELLOW  : this.TW_CLASS.ALERT_CONTENT_YELLOW,
      gray:    isFull ? this.TW_CLASS.ALERT_CONTENT_FULL_GRAY    : this.TW_CLASS.ALERT_CONTENT_GRAY,
      indigo:  isFull ? this.TW_CLASS.ALERT_CONTENT_FULL_INDIGO  : this.TW_CLASS.ALERT_CONTENT_INDIGO,
    };

    return classMap[config.key] || classMap['primary'];
  });

  // Métodos de acción
  hideAlert() {
    this.showAlert.set(false);
  }

  btnClicked() {
    this.btnClickedEvent.emit(true);
  }
}
