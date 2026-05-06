import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cygnus-radio-group',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-radio-group.component.html',
})
export class CygnusRadioGroupComponent {
  control = input<FormControl<string>>();
  legend = input<string>('');
  orientation = input<'col' | 'row'>('col');
}
