import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { TW_CLASS } from '../const/tailwind.const';
import { FormControl } from '@angular/forms';
import { TextareaType } from 'ngx-cygnus-ui/types';

@Component({
  selector: 'cygnus-textarea',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-textarea.component.html',
})
export class CygnusTextareaComponent implements OnInit {
  TW_CLASS = TW_CLASS;

  private static idCounter = 0;
  control = input<FormControl<string>>();
  textareaId = signal<string>('');

  textareaType = input<TextareaType>('simple');
  textareaPlaceholder = input<string>('');
  textareaLabel = input<string>('');

  ngOnInit() {
    // Generar ID único si no se proporciona
    this.textareaId.set(`cg-textarea-${++CygnusTextareaComponent.idCounter}`);
  }

  setValue(value:string ) {
    this.control()?.setValue(value);
    this.control()?.markAsDirty();
    this.control()?.markAsTouched();
  }

}
