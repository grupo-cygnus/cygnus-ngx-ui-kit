import {
  ChangeDetectionStrategy, Component, computed, effect,
  ElementRef, input, OnInit, output, signal, viewChild
} from '@angular/core';
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

  TW_CLASS = TW_CLASS;

  control = input<FormControl<string>>();
  isRutFormatActive = input<boolean>(false);
  useRutDots = input<boolean>(false);

  inputId = signal<string>('');
  inputCustomType = input<InputCustomType>('base');
  inputColor = input<InputColor>('base');
  inputSize = input<InputSize>('');
  iconAsset = input<string>('');
  iconState = input<boolean>(false);
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

  useTruncate = input<boolean>(false);
  truncateLength = input<number>(9);
  onlyNumbers = input<boolean>(true);

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

  // ─── Computed signals ────────────────────────────────────────────────────────
  // Cada computed se recalcula SOLO cuando sus señales de entrada cambian,
  // eliminando el trabajo redundante que Angular hacía en cada ciclo de CD.

  /** Tipo del <input> nativo — evita la expresión ternaria anidada en el template */
  inputType = computed<string>(() => {
    if (this.inputCustomType() === 'file') return 'file';
    return this.typePassword() ? 'password' : 'text';
  });

  /** Clase del wrapper externo */
  wrapperClass = computed<string>(() =>
    this.gradientBorder() ? TW_CLASS.GRADIENT_WRAPPER : TW_CLASS.NORMAL_WRAPPER
  );

  /** Clase del wrapper interno */
  innerClass = computed<string>(() =>
    this.gradientBorder() ? TW_CLASS.GRADIENT_INNER : 'relative'
  );

  /** Clase del párrafo de hint */
  hintClass = computed<string>(() =>
    `${TW_CLASS.HINT_TEXT} ${this.hintGetColor()}`
  );

  /** Clase del label (fusiona labelGetType + labelColorGetType) */
  labelClass = computed<string>(() =>
    `${this.labelGetType()} ${this.labelColorGetType()}`
  );

  /**
   * Clase completa del <input>.
   * Era la expresión más costosa del template (15+ concatenaciones dinámicas).
   * Ahora se recalcula solo cuando cambia inputCustomType, inputColor,
   * iconAsset, iconPosition, inputDisabled o gradientBorder.
   */
  inputClass = computed<string>(() => {
    const type     = this.inputCustomType();
    const iconPos  = this.iconPosition();
    const disabled = this.inputDisabled();
    const gradient = this.gradientBorder();
    const pseudo   = this.pseudoIconCLPPhone();
    const hasIcon  = this.iconAsset() !== '';

    const parts: string[] = [TW_CLASS.INPUT_BASE];

    if (type !== 'base') parts.push('peer');

    if (type === 'label-top')         parts.push(TW_CLASS.INPUT_TOP_BASE);
    if (type === 'label-interactive') parts.push(TW_CLASS.LABEL_INTERACTIVE_COLOR_BASE);

    if (type === 'floating') {
      parts.push(
        !this.iconState() && (hasIcon || pseudo)
          ? TW_CLASS.INPUT_FLOATING_ICON
          : TW_CLASS.INPUT_FLOATING
      );
    }

    if (type === 'file') parts.push(TW_CLASS.INPUT_FILE);

    parts.push(this.inputGetColor());
    parts.push(this.inputGetTopColor());
    parts.push(this.inputGetInteractiveColor());
    parts.push(this.inputGetSize());

    if (iconPos === 'left') parts.push(pseudo ? 'pl-15' : 'pl-9');
    if (disabled)           parts.push(TW_CLASS.INPUT_DISABLED);
    if (gradient)           parts.push('bg-warning-25! dark:bg-gray-700!');

    return parts.filter(Boolean).join(' ');
  });

  // ─────────────────────────────────────────────────────────────────────────────

  constructor() {
    effect(() => {
      const debeLimpiar = this.inputClearValue();
      const inputRef    = this.cygnusInput();
      const controlObj  = this.control();

      if (debeLimpiar && inputRef) {
        const inputEl = inputRef.nativeElement as HTMLInputElement;

        controlObj?.setValue('', { emitEvent: false });
        controlObj?.markAsPristine();

        this.renderer.setProperty(inputEl, 'value', ' ');

        setTimeout(() => {
          this.renderer.setProperty(inputEl, 'value', '');
          inputEl.value = '';

          const hadFocus = document.activeElement === inputEl;
          if (hadFocus) inputEl.blur();

          inputEl.dispatchEvent(new Event('input',  { bubbles: true }));
          inputEl.dispatchEvent(new Event('change', { bubbles: true }));

          if (hadFocus) setTimeout(() => inputEl.focus(), 0);

          this.cdr.detectChanges();
        }, 10);
      }
    });

    effect(() => {
      const val = this.initializeInputValue();
      if (val !== undefined && val !== null) {
        this.control()?.setValue(val);
      }
    });
  }

  ngOnInit() {
    this.inputId.set(`cg-input-${++CygnusInputComponent.idCounter}`);
  }

  notifyIconClicked(): void {
    this.iconClicked.emit('iconClicked');
  }

  setInputIsBlur(value: string): void {
    this.setValue(value);
    this.inputIsBlur.emit(true);
  }

  setValue(value: string) {
    if (this.control()?.value === value) return;
    this.control()?.setValue(value);
    this.control()?.markAsDirty();
    this.control()?.markAsTouched();
    this.inputValueOutput.emit(value);
  }

  inputGetSize(): string {
    switch (this.inputSize()) {
      case 'lg': return TW_CLASS.INPUT_SIZE_LG;
      case 'sm': return TW_CLASS.INPUT_SIZE_SM;
      default:   return '';
    }
  }

  inputGetColor(): string {
    switch (this.inputColor()) {
      case 'success': return TW_CLASS.INPUT_SUCCESS;
      case 'warning': return TW_CLASS.INPUT_WARNING;
      case 'error':   return TW_CLASS.INPUT_ERROR;
      default:        return TW_CLASS.INPUT_GENERIC;
    }
  }

  inputGetTopColor(): string {
    switch (this.inputColor()) {
      case 'success': return TW_CLASS.INPUT_TOP_SUCCESS;
      case 'warning': return TW_CLASS.INPUT_TOP_WARNING;
      case 'error':   return TW_CLASS.INPUT_TOP_ERROR;
      default:        return TW_CLASS.INPUT_TOP_GENERIC;
    }
  }

  inputGetInteractiveColor(): string {
    if (this.inputCustomType() === 'label-interactive') {
      switch (this.inputColor()) {
        case 'success': return `${TW_CLASS.INPUT_INTERACTIVE_BASE} ${TW_CLASS.INPUT_INTERACTIVE_SUCCESS}`;
        case 'warning': return `${TW_CLASS.INPUT_INTERACTIVE_BASE} ${TW_CLASS.INPUT_INTERACTIVE_WARNING}`;
        case 'error':   return `${TW_CLASS.INPUT_INTERACTIVE_BASE} ${TW_CLASS.INPUT_INTERACTIVE_ERROR}`;
        default:        return `${TW_CLASS.INPUT_INTERACTIVE_BASE} ${TW_CLASS.INPUT_INTERACTIVE_GENERIC}`;
      }
    }
    return '';
  }

  labelFloatingGetColor(): string {
    switch (this.inputColor()) {
      case 'success': return TW_CLASS.LABEL_FLOATING_SUCCESS;
      case 'warning': return TW_CLASS.LABEL_FLOATING_WARNING;
      case 'error':   return TW_CLASS.LABEL_FLOATING_ERROR;
      default:        return '';
    }
  }

  labelTopGetColor(): string {
    switch (this.inputColor()) {
      case 'success': return TW_CLASS.LABEL_TOP_SUCCESS;
      case 'warning': return TW_CLASS.LABEL_TOP_WARNING;
      case 'error':   return TW_CLASS.LABEL_TOP_ERROR;
      default:        return TW_CLASS.LABEL_TOP_BASE;
    }
  }

  labelInteractiveGetColor(): string {
    switch (this.inputColor()) {
      case 'success': return TW_CLASS.LABEL_INTERACTIVE_COLOR_SUCCESS;
      case 'warning': return TW_CLASS.LABEL_INTERACTIVE_COLOR_WARNING;
      case 'error':   return TW_CLASS.LABEL_INTERACTIVE_COLOR_ERROR;
      default:        return TW_CLASS.LABEL_INTERACTIVE_COLOR_BASE;
    }
  }

  hintGetColor(): string {
    if (this.hintColor()) {
      switch (this.inputColor()) {
        case 'success': return TW_CLASS.HINT_SUCCESS;
        case 'warning': return TW_CLASS.HINT_WARNING;
        case 'error':   return TW_CLASS.HINT_ERROR;
        default:        return '';
      }
    }
    return '';
  }

  labelColorGetType(): string {
    const type = this.inputCustomType();
    if (type === 'floating')          return this.labelFloatingGetColor();
    if (type === 'label-top')         return this.labelTopGetColor();
    if (type === 'label-interactive') return this.labelInteractiveGetColor();
    return '';
  }

  labelGetType(): string {
    const type = this.inputCustomType();
    if (type === 'fieldset-legend-label') return TW_CLASS.FIELDSET_LEGEND;
    if (type === 'label-top')             return TW_CLASS.LABEL_TOP_BASE;
    if (type === 'label-interactive')     return TW_CLASS.LABEL_INTERACTIVE_BASE;
    if (type === 'floating')              return `${TW_CLASS.LABEL_BASE} ${TW_CLASS.LABEL_FLOATING_BASE}`;
    return '';
  }
}
