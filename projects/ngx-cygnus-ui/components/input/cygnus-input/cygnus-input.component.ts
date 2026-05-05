import { ChangeDetectionStrategy, Component, effect, ElementRef, input, OnInit, output, signal, viewChild } from '@angular/core';
import { Renderer2, ChangeDetectorRef, inject } from '@angular/core';

import { IconColorText, IconTextSize, NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { InputColor, InputSize, InputCustomType } from 'ngx-cygnus-ui/types';
import { IconPosition } from 'ngx-cygnus-ui/types';
import { TW_CLASS } from '../const/tailwind.const';
import { FormControl } from '@angular/forms';
import {
  EmailFormatterDirective,
  RutFormatDirective,
  MaxLengthTruncateDirective,
  OnlyLettersDirective,
  CustomInputTextDirective,
  TextEmpresaDirective,
} from 'ngx-cygnus-ui/directives';
import { SelectGeneric } from 'ngx-cygnus-ui/interfaces';

@Component({
  selector: 'cygnus-input',
  imports: [
    NgxCygnusIconsComponent,
    RutFormatDirective,
    MaxLengthTruncateDirective,
    OnlyLettersDirective,
    EmailFormatterDirective,
    CustomInputTextDirective,
    TextEmpresaDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-input.component.html',
})
export class CygnusInputComponent implements OnInit {
  private static idCounter = 0;

  TW_CLASS = TW_CLASS; // esto fue creado para reemplazar @apply de tailwind, ya la documentación de tailwind 4 recomienda no usar @apply y se dice que no funciona muy bien en angular.

  control = input<FormControl<string>>();
  isRutFormatActive = input<boolean>(false);
  useRutDots = input<boolean>(false);

  inputId = signal<string>('');
  inputCustomType = input<InputCustomType>('base');
  inputColor = input<InputColor>('base');
  inputSize = input<InputSize>('');
  iconAsset = input<string>('');
  iconState = input<boolean>(false); // true para identificar el estilo del input cuando es ícono de success/warning/error
  iconPosition = input<IconPosition>('right');
  iconColor = input<IconColorText>('black');
  iconSize = input<IconTextSize>('lg');
  pseudoIconCLPPhone = input<boolean>(false);
  hintColor = input<boolean>(false);
  textLabel = input<string>('');
  textHint = input<string>('');
  textPlaceholder = input<string>(' ');
  inputDisabled = input<boolean>(false);
  typePassword = input<boolean>(false);
  inputClearValue = input<boolean>(false);

  isInvisiblePhoneDrop = signal<boolean>(true);
  menuSearchTextPhoneDrop = signal<string>('');
  menuSearchContentArr = input<SelectGeneric[]>([]);

  cygnusInput = viewChild<ElementRef>('cygnusInput');
  iconClicked = output<string>();

  initializeInputValue = input<string>('');
  inputValueOutput = output<string>();
  inputIsBlur = output<boolean>();

  gradientBorder = input<boolean>(false);

  // Nuevos controles para la directiva MaxLengthTruncateDirective
  useTruncate = input<boolean>(false);
  truncateLength = input<number>(9);
  onlyNumbers = input<boolean>(true); // Para activar/desactivar la lógica

  isLetterOnly = input<boolean>(false);
  isLetterOnlyMaxChars = input<number>(50);
  isLetterOnlyMinChars = input<number>(2);

  emailFormatterEnabled = input<boolean>(false);

  customInputTextEnabled = input<boolean>(false);
  customInputTextMaxLength = input<number>(200);
  customInputTextMinLength = input<number>(5);

  textEmpresaEnabled = input<boolean>(false);
  textEmpresaMaxLength = input<number>(100);
  textEmpresaMinLength = input<number>(2);

  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      const debeLimpiar = this.inputClearValue();
      const inputRef = this.cygnusInput();
      const controlObj = this.control();

      if (debeLimpiar && inputRef) {
        const inputEl = inputRef.nativeElement as HTMLInputElement;

        // 1. Limpiamos el modelo de Angular
        controlObj?.setValue('', { emitEvent: false });
        controlObj?.markAsPristine();

        // 2. EL TRUCO NUCLEAR: "Jittering"
        // Forzamos al navegador a ver un cambio real (de texto a espacio)
        this.renderer.setProperty(inputEl, 'value', ' ');

        // Usamos un micro-timeout para que el navegador procese el ' ' antes del ''
        setTimeout(() => {
          // 3. Ahora sí, limpiamos totalmente
          this.renderer.setProperty(inputEl, 'value', '');
          inputEl.value = '';

          // 4. Forzamos la pérdida de foco momentánea
          // Esto es CRUCIAL en Desktop para limpiar el buffer de "Undo"
          const hadFocus = document.activeElement === inputEl;
          if (hadFocus) inputEl.blur();

          // 5. Notificamos a las directivas con un evento "limpio"
          inputEl.dispatchEvent(new Event('input', { bubbles: true }));
          inputEl.dispatchEvent(new Event('change', { bubbles: true }));

          // 6. Si tenía el foco, se lo devolvemos en el siguiente frame
          if (hadFocus) {
            setTimeout(() => inputEl.focus(), 0);
          }

          this.cdr.detectChanges();
        }, 10); // 10ms es suficiente para que Desktop se dé cuenta
      }
    });

    effect(() => {
      // Reaccionar a valor inicial si cambia externamente
      const val = this.initializeInputValue();
      if (val !== undefined && val !== null) {
        this.control()?.setValue(val);
      }
    });
  }

  ngOnInit() {
    // Generar ID único si no se proporciona
    this.inputId.set(`cg-input-${++CygnusInputComponent.idCounter}`);
  }

  notifyIconClicked(): void {
    this.iconClicked.emit('iconClicked');
  }

  setInputIsBlur(value: string): void {
    this.setValue(value);
    this.inputIsBlur.emit(true);
  }

  setValue(value:string ) {
    // Si el valor es el mismo, no hacemos nada para evitar bucles
    if (this.control()?.value === value) return;

    this.control()?.setValue(value);
    this.control()?.markAsDirty();
    this.control()?.markAsTouched();
    this.inputValueOutput.emit(value);
  }

  inputGetSize():string {
    switch (this.inputSize()) {
      case 'lg':
        return this.TW_CLASS.INPUT_SIZE_LG;
      case 'sm':
        return this.TW_CLASS.INPUT_SIZE_SM;
      default:
        return '';
    }
  }

  inputGetColor():string {
    switch (this.inputColor()) {
      case 'success':
        return this.TW_CLASS.INPUT_SUCCESS;
      case 'warning':
        return this.TW_CLASS.INPUT_WARNING;
      case 'error':
        return this.TW_CLASS.INPUT_ERROR;
      default:
        return this.TW_CLASS.INPUT_GENERIC;
    }
  }

  inputGetTopColor():string {
    switch (this.inputColor()) {
      case 'success':
        return this.TW_CLASS.INPUT_TOP_SUCCESS;
      case 'warning':
        return this.TW_CLASS.INPUT_TOP_WARNING;
      case 'error':
        return this.TW_CLASS.INPUT_TOP_ERROR;
      default:
        return this.TW_CLASS.INPUT_TOP_GENERIC;
    }
  }

  inputGetInteractiveColor():string {
    if (this.inputCustomType()==='label-interactive') {
      switch (this.inputColor()) {
        case 'success':
          return (this.TW_CLASS.INPUT_INTERACTIVE_BASE + ' ' + this.TW_CLASS.INPUT_INTERACTIVE_SUCCESS);
        case 'warning':
          return (this.TW_CLASS.INPUT_INTERACTIVE_BASE + ' ' + this.TW_CLASS.INPUT_INTERACTIVE_WARNING);
        case 'error':
          return (this.TW_CLASS.INPUT_INTERACTIVE_BASE + ' ' + this.TW_CLASS.INPUT_INTERACTIVE_ERROR);
        default:
          return (this.TW_CLASS.INPUT_INTERACTIVE_BASE + ' ' + this.TW_CLASS.INPUT_INTERACTIVE_GENERIC);
      }
    } else return '';
  }

  labelFloatingGetColor():string {
    switch (this.inputColor()) {
      case 'success':
        return this.TW_CLASS.LABEL_FLOATING_SUCCESS;
      case 'warning':
        return this.TW_CLASS.LABEL_FLOATING_WARNING;
      case 'error':
        return this.TW_CLASS.LABEL_FLOATING_ERROR;
      default:
        return '';
    }
  }

  labelTopGetColor():string {
    switch (this.inputColor()) {
      case 'success':
        return this.TW_CLASS.LABEL_TOP_SUCCESS;
      case 'warning':
        return this.TW_CLASS.LABEL_TOP_WARNING;
      case 'error':
        return this.TW_CLASS.LABEL_TOP_ERROR;
      default:
        return this.TW_CLASS.LABEL_TOP_BASE;
    }
  }

  labelInteractiveGetColor():string {
    switch (this.inputColor()) {
      case 'success':
        return this.TW_CLASS.LABEL_INTERACTIVE_COLOR_SUCCESS;
      case 'warning':
        return this.TW_CLASS.LABEL_INTERACTIVE_COLOR_WARNING;
      case 'error':
        return this.TW_CLASS.LABEL_INTERACTIVE_COLOR_ERROR;
      default:
        return this.TW_CLASS.LABEL_INTERACTIVE_COLOR_BASE;
    }
  }

  hintGetColor():string {
    if (this.hintColor()) {
      switch (this.inputColor()) {
        case 'success':
          return this.TW_CLASS.HINT_SUCCESS;
        case 'warning':
          return this.TW_CLASS.HINT_WARNING;
        case 'error':
          return this.TW_CLASS.HINT_ERROR;
        default:
          return '';
      }
    }
    return '';
  }

  labelColorGetType() {
    if (this.inputCustomType()==='floating') return this.labelFloatingGetColor();
    if (this.inputCustomType()==='label-top') return this.labelTopGetColor();
    if (this.inputCustomType()==='label-interactive') return this.labelInteractiveGetColor();
    return '';
  }

  labelGetType():string {
    if (this.inputCustomType()==='fieldset-legend-label') return this.TW_CLASS.FIELDSET_LEGEND;
    if (this.inputCustomType()==='label-top') return this.TW_CLASS.LABEL_TOP_BASE;
    if (this.inputCustomType()==='label-interactive') return this.TW_CLASS.LABEL_INTERACTIVE_BASE;
    if (this.inputCustomType()==='floating') return (this.TW_CLASS.LABEL_BASE + ' ' + this.TW_CLASS.LABEL_FLOATING_BASE);
    return '';
  }

}
