import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { CygnusButtonComponent, } from 'ngx-cygnus-ui/components/button';

@Component({
  selector: 'cygnus-pagination',
  imports: [
    CygnusButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-pagination.component.html',
})
export class CygnusPaginationComponent {
  maxCounter     = input<number>(0);
  currentCounter = model<number>(0);
  paginationType = input<string>('');

  goToLeft():void {
    if (this.currentCounter() > 1) {
      this.currentCounter.update( current => current-=1 );
    }
  }

  goToRight():void {
    if (this.currentCounter() < this.maxCounter()) {
      this.currentCounter.update( current => current+=1 );
    }
  }

  goToSelfPosition(value:number):void {
    if (this.currentCounter() != value) {
      this.currentCounter.set(value);
    }
  }

  getVisiblePages(): (number | string)[] {
    const total = this.maxCounter();
    const current = this.currentCounter();
    const maxVisible = 5;

    // Si el total es menor o igual a maxVisible, mostrar todos
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // Siempre mostrar la primera página
    pages.push(1);

    // Calcular el rango alrededor de la página actual
    let start = Math.max(2, current - 1);
    let end = Math.min(total - 1, current + 1);

    // Ajustar si estamos muy cerca del inicio
    if (current <= 3) {
      start = 2;
      end = Math.min(total - 1, 4);
    }

    // Ajustar si estamos muy cerca del final
    if (current >= total - 2) {
      start = Math.max(2, total - 3);
      end = total - 1;
    }

    // Agregar puntos suspensivos si hay gap después del primer botón
    if (start > 2) {
      pages.push('...');
    }

    // Agregar páginas del rango
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Agregar puntos suspensivos si hay gap antes del último botón
    if (end < total - 1) {
      pages.push('...');
    }

    // Siempre mostrar la última página
    pages.push(total);

    return pages;
  }
}
