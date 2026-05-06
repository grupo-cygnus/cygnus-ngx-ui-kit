import { ChangeDetectionStrategy, Component, effect, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar NgClass
import { SelectGeneric } from 'ngx-cygnus-ui/interfaces';
import { TW_CLASS } from '../const/tailwind.const';
import { AutoWidthSelectDirective } from 'ngx-cygnus-ui/directives';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cygnus-select',
  imports: [
    CommonModule,
    AutoWidthSelectDirective,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-select.component.html',
  styles: `select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23667085' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
  }`
})
export class CygnusSelectComponent {
  private static idCounter = 0;
  // Necesitamos acceso al documento para verificar el focus en el template de forma reactiva
  document = document;

  control = input<FormControl<string>>(new FormControl());
  isSelected = output<string>();
  selectIsBlur = output<boolean>();
  inputReset = model<boolean>(false);

  TW_CLASS = TW_CLASS;
  selId = signal<string>('');
  options = input<SelectGeneric[]>();
  selSize = input<string>('');
  isDisabled = input<boolean>(false);
  selState = input<string>('');
  selectLabel = input<string>('');
  labelStyle = input<'fieldset-legend-label' | 'label-interactive'| 'animated-legend-label' | 'fake-placeholder' | 'label-top'>('fieldset-legend-label');
  selectHint = input<string>('');
  selAutoWidth = input<boolean>(false);
  selInstructionOpDisabled = input<string>();
  gradientBorder = input<boolean>(false);
  hintColor = input<boolean>(false);
  isFocused = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.inputReset()) {
        this.reset();
      }
    });
  }

  ngOnInit() {
    // Generar ID único si no se proporciona
    this.selId.set(`cg-select-${++CygnusSelectComponent.idCounter}`);
  }

  setValue(value:string ) {

    this.control()?.setValue(value);
    this.control()?.markAsDirty();
    this.control()?.markAsTouched();
    this.isSelected.emit(value);
  }

  reset() {
    this.control()?.setValue('');
    this.inputReset.set(false);
  }

  selGetSize():string {
    switch (this.selSize()) {
      case 'xs':
        return this.TW_CLASS.SELECT_XS;
      case 'lg':
        return this.TW_CLASS.SELECT_LG;
      default:
        return '';
    }
  }

  selGetType():string {
    switch (this.selState()) {
      case 'error':
        return this.TW_CLASS.SELECT_ERROR;
      case 'success':
        return this.TW_CLASS.SELECT_SUCCESS;
      default:
        return this.TW_CLASS.SELECT_GENERIC;
    }
  }

  hintGetColor():string {
    if (this.hintColor()) {
      switch (this.selState()) {
        case 'success':
          return this.TW_CLASS.HINT_SUCCESS;
        case 'error':
          return this.TW_CLASS.HINT_ERROR;
        default:
          return '';
      }
    }
    return '';
  }

  generateBlurEvent() {
    this.isFocused.set(false); // <--- Quitamos foco
    this.selectIsBlur.emit(true);
  }

  onFocus() {
    this.isFocused.set(true); // <--- Marcamos foco
  }

}
