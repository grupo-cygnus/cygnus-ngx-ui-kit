import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { IconColorText, NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { TW_CLASS } from '../const/tailwind.const';

@Component({
  selector: 'cygnus-alert-simple',
  imports: [NgxCygnusIconsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-alert-simple.component.html',
  styles: `
    :host { // By default, Angular components behave like inline elements. To allow them to occupy the full width of their parent container, you need to change their display property to block.
      display: block;
      width: 100%;
    }
  `,
})
export class CygnusAlertSimpleComponent {
  TW_CLASS = TW_CLASS;
  showAlert = signal<boolean>(true);

  // Inputs (Signals)
  alertIcon = input<string>('');
  alertEquis = input<boolean>(false);
  alertTitle = input<string>('');
  alertContent = input<string>('');
  alertTypes = input<string>('');
  isClosed = output<any>();
  isRounded = input<boolean>(true);

  // --- Lógica Reactiva ---

  // 1. Calculamos el color del icono automáticamente basándonos en el tipo
  // Esto reemplaza las llamadas a .set() que hacías en los switches
  alertIconColor = computed<IconColorText>(() => {
    const type = this.alertTypes();
    if (type.includes('alert-primary')) return 'blue';
    if (type.includes('alert-red')) return 'red';
    if (type.includes('alert-green')) return 'green';
    if (type.includes('alert-yellow')) return 'yellow';
    if (type.includes('alert-gray')) return 'secgray';
    if (type.includes('alert-indigo')) return 'indigo';
    return 'blue';
  });

  // 2. Calculamos todas las clases de Tailwind automáticamente
  alertAllClasses = computed(() => {
    const types = this.alertTypes().split(' ');
    return types.map(t => {
      return this.alertEquis()
        ? this.addTailwindEquisClasses(t)
        : this.addTailwindClasses(t);
    }).join(' ');
  });

  addTailwindClasses(customClass: string): string {
    switch (customClass) {
      case 'alert-primary': return this.TW_CLASS.ALERT_SIMPLE_PRIMARY;
      case 'alert-red':     return this.TW_CLASS.ALERT_SIMPLE_RED;
      case 'alert-green':   return this.TW_CLASS.ALERT_SIMPLE_GREEN;
      case 'alert-yellow':  return this.TW_CLASS.ALERT_SIMPLE_YELLOW;
      case 'alert-gray':    return this.TW_CLASS.ALERT_SIMPLE_GRAY;
      case 'alert-indigo':  return this.TW_CLASS.ALERT_SIMPLE_INDIGO;
      default:              return this.TW_CLASS.ALERT_SIMPLE_PRIMARY;
    }
  }

  addTailwindEquisClasses(customClass: string): string {
    switch (customClass) {
      case 'alert-primary': return this.TW_CLASS.ALERT_SIMPLE_EQUIS_PRIMARY;
      case 'alert-red':     return this.TW_CLASS.ALERT_SIMPLE_EQUIS_RED;
      case 'alert-green':   return this.TW_CLASS.ALERT_SIMPLE_EQUIS_GREEN;
      case 'alert-yellow':  return this.TW_CLASS.ALERT_SIMPLE_EQUIS_YELLOW;
      case 'alert-gray':    return this.TW_CLASS.ALERT_SIMPLE_EQUIS_GRAY;
      case 'alert-indigo':  return this.TW_CLASS.ALERT_SIMPLE_EQUIS_INDIGO;
      default:              return this.TW_CLASS.ALERT_SIMPLE_EQUIS_PRIMARY;
    }
  }

  hideAlert() {
    this.isClosed.emit({"alertTitle": this.alertTitle(), "alertContent": this.alertContent()});
    this.showAlert.set(false);
  }
}
