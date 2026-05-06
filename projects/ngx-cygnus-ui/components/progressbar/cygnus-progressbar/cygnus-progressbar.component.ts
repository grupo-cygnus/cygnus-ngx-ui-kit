import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'cygnus-progressbar',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-progressbar.component.html',
})
export class CygnusProgressbarComponent {
  value = input.required<number>();
  color = input<string>('bg-blue-500');

  // Computed para manejar la clase de color de forma reactiva
  protected colorClass = computed(() => this.color());
}
