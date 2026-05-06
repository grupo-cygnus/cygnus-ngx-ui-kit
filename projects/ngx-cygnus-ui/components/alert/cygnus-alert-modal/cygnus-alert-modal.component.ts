import { ChangeDetectionStrategy, Component, computed, HostListener, input, model, output } from '@angular/core';

import { IconColorText, NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';

import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';

import { TW_CLASS } from '../const/tailwind.const';


@Component({
  selector: 'cygnus-alert-modal',
  imports: [
    NgxCygnusIconsComponent,
    CygnusButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-alert-modal.component.html',
})
export class CygnusAlertModalComponent {
  TW_CLASS = TW_CLASS;

  // Inputs & Models
  modalTitle = input<string>('');
  btnFullText = input<string>('Aceptar');
  maxWidth = input<'md' | 'sm' | 'xs'>('xs');
  alertBtnClose = input<boolean>(false);
  showModal = model<boolean>(false);
  alertTypes = input<string>('');
  alertIconAsset = input<string>('');
  closeOnBlur = input<boolean>(true);
  closeOnEscape = input<boolean>(true);
  withX = input<boolean>(false);
  setAlertIconColor = input<IconColorText>();
  flexItemsPosition = input<'items-center' | 'items-end' | 'items-start'>('items-center'); // 'items-end'
  animationType = input<'bounce-right' | 'center-to-right'>('bounce-right');

  // --- Lógica de Configuración Computada ---

  containerConfig = computed(() => {
    const pos = this.flexItemsPosition();
    const type = this.animationType();

    // Definimos la configuración para cada tipo de animación
    const handlers: Record<string, () => { className: string; tx?: string }> = {
      // Caso 1: Rebote que se asienta a la derecha
      'bounce-right': () => ({
        className: pos === 'items-end' ? 'animate-settle-right' : '',
        tx: '0' // No suele requerir variable dinámica si el keyframe es fijo
      }),

      // Caso 2: Tu animación original de deslizamiento dinámico
      'center-to-right': () => ({
        className: pos === 'items-center' ? '' : 'animate-slide-in',
        tx: pos === 'items-start' ? '+100%' : pos === 'items-end' ? '-100%' : '0'
      })
    };

    // Obtenemos la configuración según el tipo, con un fallback seguro
    const config = handlers[type]?.() ?? { className: '', tx: '0' };

    return {
      classes: `${pos} ${config.className}`,
      style: { '--translate-x': config.tx }
    };
  });


  private config = computed(() => {
    const type = this.alertTypes();

    if (type.includes('alert-red')) {
      return {
        color: 'red' as IconColorText, btn: 'btn-error',
        classes: this.TW_CLASS.ALERT_CONTENT_MODAL_RED
      };
    }
    if (type.includes('alert-green')) {
      return {
        color: 'green' as IconColorText, btn: 'btn-success',
        classes: this.TW_CLASS.ALERT_CONTENT_MODAL_GREEN
      };
    }
    if (type.includes('alert-confirm')) {
      return {
        color: 'green' as IconColorText, btn: 'btn-success',
        classes: this.TW_CLASS.ALERT_CONTENT_CONFIRM
      };
    }
    if (type.includes('alert-yellow')) {
      return {
        color: 'amber' as IconColorText, btn: 'btn-warning',
        classes: this.TW_CLASS.ALERT_CONTENT_MODAL_YELLOW
      };
    }
    if (type.includes('alert-gray')) {
      return {
        color: 'secgray' as IconColorText, btn: 'btn-full-gray',
        classes: this.TW_CLASS.ALERT_CONTENT_MODAL_GRAY
      };
    }

    // Default / Primary
    return {
      color: 'blue' as IconColorText, btn: 'btn-primary',
      classes: this.TW_CLASS.ALERT_CONTENT_MODAL_PRIMARY
    };
  });

  // Signals derivados para el template
  alertIconColor = computed(() => this.config().color);
  buttonType = computed(() => this.config().btn);
  alertAllClasses = computed(() => this.config().classes);

  // Métodos
  toggleModal(): void {
    this.showModal.update(current => !current);
  }

  handleBlurClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.closeOnBlur()) {
      this.toggleModal();
    }
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    if (this.showModal() && this.closeOnEscape()) {
      this.toggleModal();
    }
  }
}
