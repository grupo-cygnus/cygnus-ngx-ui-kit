import { ChangeDetectionStrategy, Component, computed, effect, input, OnInit, output, signal, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TW_CLASS } from '../const/tailwind.const';


@Component({
  selector: 'cygnus-radio-button',
  imports: [
    RouterLink
  ],
  templateUrl: './cygnus-radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    [type='radio']:checked {
      background-image: var(--radio-svg-icon);
    }
  `,
})
export class CygnusRadioButtonComponent implements OnInit {
  private static idCounter = 0;
  TW_CLASS = TW_CLASS;

  // Inputs obligatorios y opcionales
  control = input.required<FormControl<string>>();
  labelText = input<string>('');
  themeColor = input<string>('#3b82f6'); // Color para el fondo/borde cuando está checked
  checkMarkColor = input<string>('white'); // Color del círculo pequeño interno

  isDisabled = input<boolean>(false);
  linkText = input<string>('');
  linkUrl = input<string>('');

  inputRadioValueOutput = output<string>();
  inputId = signal<string>('');

  // Lógica de estado interno para reactividad con el FormControl
  private internalControlValue = signal<string>('');

  constructor() {
    effect((onCleanup) => {
      const ctrl = this.control();
      untracked(() => this.internalControlValue.set(ctrl.value));
      const sub = ctrl.valueChanges.subscribe(val => this.internalControlValue.set(val));
      onCleanup(() => sub.unsubscribe());
    });
  }

  // Comprobar si está seleccionado
  isChecked = computed(() => this.internalControlValue() === this.labelText());

  // --- CÁLCULO DE ESTILOS DINÁMICOS ---
  dynamicStyles = computed(() => {
    const selected = this.isChecked();
    const color = this.themeColor();
    const markColor = this.checkMarkColor();

    // Construimos el SVG con el color de la marca dinámico
    const svg = `%3csvg viewBox='0 0 16 16' fill='${encodeURIComponent(markColor)}' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e`;

    return {
      'background-color': selected ? color : 'transparent',
      'border-color': selected ? color : '', // Si no está seleccionado, usa el de TW_CLASS
      '--tw-ring-color': `${color}44`, // Anillo de foco sutil
      '--radio-svg-icon': `url("data:image/svg+xml,${svg}")`
    };
  });

  ngOnInit() {
    if (!this.inputId()) {
      this.inputId.set(`cg-radio-button-${++CygnusRadioButtonComponent.idCounter}`);
    }
  }

  onRadioChange() {
    this.control().setValue(this.labelText());
    this.control().markAsDirty();
    this.control().markAsTouched();
    this.inputRadioValueOutput.emit(this.labelText());
  }

}
