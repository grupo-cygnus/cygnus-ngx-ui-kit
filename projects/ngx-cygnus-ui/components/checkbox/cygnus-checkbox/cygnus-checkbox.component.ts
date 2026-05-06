import { ChangeDetectionStrategy, Component, effect, ElementRef, input, OnInit, output, signal, viewChild } from '@angular/core';
import { TW_CLASS } from '../const/tailwind.const';
import { CheckboxSize, CheckboxType } from 'ngx-cygnus-ui/types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cygnus-checkbox',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-checkbox.component.html',
  styles: `
    [type='checkbox']:checked {
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
      @media (forced-colors: active) {
        -webkit-appearance: auto;
          -moz-appearance: auto;
                appearance: auto;
      }
    }
  `
})
export class CygnusCheckboxComponent implements OnInit {
  private static idCounter = 0;
  TW_CLASS = TW_CLASS;
  control = input<FormControl<boolean>>(); // utilizar dentro de un formulario
  isChecked = output<boolean>(); // utilizar para seleccionar elementos en una tabla
  checkedIn = input<boolean>(); // utilizar para seleccionar elementos en una tabla

  checkboxRef = viewChild<ElementRef<HTMLInputElement>>('cygnusCheckbox');

  checkboxId = signal<string>('');
  checkboxType = input<CheckboxType>('base');
  checkboxSize = input<CheckboxSize>('sm');
  checkboxText = input<string>('');
  checkboxHint = input<string>('');

  checkboxLink = input<string>('');
  checkboxLinkText = input<string>('');

  constructor() {
    effect(() => {
      this.checkboxRef()!.nativeElement.checked = this.checkedIn() || false;
      this.isChecked.emit(this.checkedIn() || false);
    });
  }

  ngOnInit() {
    // Generar ID único si no se proporciona
    this.checkboxId.set(`cg-checkbox-${++CygnusCheckboxComponent.idCounter}`);
  }

  checkboxGetSize():string {
    switch (this.checkboxSize()) {
      case 'sm':
        return this.TW_CLASS.CHECKBOX_SM;
      case 'lg':
        return this.TW_CLASS.CHECKBOX_LG;
      default:
        return this.TW_CLASS.CHECKBOX_LG;
    }
  }

  setValue(value:boolean ) {
    this.control()?.setValue(value);
    this.control()?.markAsDirty();
    this.control()?.markAsTouched();
    this.isChecked.emit(value);
  }

}
