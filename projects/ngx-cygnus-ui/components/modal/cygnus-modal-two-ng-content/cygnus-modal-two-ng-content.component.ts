import { ChangeDetectionStrategy, Component, HostListener, input, model } from '@angular/core';
import { NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';

@Component({
  selector: 'cygnus-modal-two-ng-content',
  imports: [
    NgxCygnusIconsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-modal-two-ng-content.component.html',
})
export class CygnusModalTwoNgContentComponent {
  withX = input<boolean>(false);
  showModal = model<boolean>(false);
  inputMaxW = input<string>('max-w-[95vw] md:max-w-[85vw] lg:max-w-[75vw] xl:max-w-[65vw] 2xl:max-w-[55vw]');
  inputMaxH = input<string>('max-h-[90vh]');
  closeOnBlur = input<boolean>(true); // si es true, se puede cerrar al hacer click afuera del modal
  closeOnEscape = input<boolean>(true); // permitir/bloquear el cierre con tecla Escape
  twTitleFontWeight = input<string>('font-medium');

  toggleModal():void {
    this.showModal.update( current => !current );
  }

  handleBlurClick(event: MouseEvent): void {
    // Check if the element that was clicked is the one with the event listener
    if (event.target === event.currentTarget && this.closeOnBlur()) { //Blur div clicked directly!
      this.toggleModal();
    } // else Click originated from a child element, Blur handler ignored.
  }

  @HostListener('document:keydown.escape') // Escucha eventos de teclado en todo el documento
  handleEscapeKey() {
    if (this.showModal() && this.closeOnEscape()) { // Si el modal está abierto y la opción está habilitada, cerramos
      this.toggleModal();
    }
  }
}
