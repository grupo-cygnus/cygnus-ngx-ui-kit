import { Component, input } from '@angular/core';

@Component({
  selector: 'cygnus-loading-screen',
  imports: [],
  templateUrl: './cygnus-loading-screen.component.html',
})
export class CygnusLoadingScreenComponent {
  mostrarTexto = input<string>('Cargando datos...');
}
