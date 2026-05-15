import { Component, input } from '@angular/core';

@Component({
  selector: 'cygnus-loading-screen',
  imports: [],
  templateUrl: './cygnus-loading-screen.component.html',
})
export class CygnusLoadingScreenComponent {
  mostrarTexto = input<string>('Cargando datos...');
  textClassColor = input<string>('text-white');
  borderClassColor = input<string>('border-gray-300');
  spinnerClassColor = input<string>('border-t-blue-500');
}
