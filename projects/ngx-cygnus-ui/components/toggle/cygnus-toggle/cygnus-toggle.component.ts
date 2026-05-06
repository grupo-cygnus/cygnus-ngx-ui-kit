import { ChangeDetectionStrategy, Component, input, OnInit, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TW_CLASS } from '../const/tailwind.const';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cygnus-toggle',
  imports: [
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-toggle.component.html',
  styles: `
    .toggle-base:checked::after {
      transform: translateX(calc(65% + 2px));
    }
  `
})
export class CygnusToggleComponent implements OnInit {
  private static idCounter = 0;
  TW_CLASS = TW_CLASS;
  toggleId = signal<string>('');
  toggleText = input<string>('');
  inputIsChecked = input<boolean>(false);
  inputIsDisabled = input<boolean>(false);
  inputlink = input<string>('');
  inputlinkText = input<string>('');
  toggleDescription = input<string>('');
  checkedCustomColor = input<string>(''); // ejemplo: #2ec946
  checkedCustomColorFinal = signal<string>('');

  control = input<FormControl<boolean>>();

  ngOnInit() {
    // Generar ID único si no se proporciona
    this.toggleId.set(`cg-toggle-${++CygnusToggleComponent.idCounter}`);
    this.setCheckedCustomColor();
  }

  setValue(value:boolean ) {
    // console.log('input is checked?: ', value);

    this.control()?.setValue(value);
    this.control()?.markAsDirty();
    this.control()?.markAsTouched();
  }

  setCheckedCustomColor():string {
    switch (this.checkedCustomColor()) {
      case 'primary':
        return TW_CLASS.TOGGLE_PRIMARY;
      case 'green':
        return TW_CLASS.TOGGLE_GREEN;
      case 'red':
        return TW_CLASS.TOGGLE_RED;
      case 'amber':
        return TW_CLASS.TOGGLE_AMBER;
      default:
        return TW_CLASS.TOGGLE_PRIMARY;
    }
  }

}
