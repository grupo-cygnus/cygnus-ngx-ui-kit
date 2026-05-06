import { ChangeDetectionStrategy, Component, effect, ElementRef, HostListener, input, output, signal, viewChild } from '@angular/core';
import { IconColorText, IconTextSize, NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { InputColor, InputSize, InputCustomType } from 'ngx-cygnus-ui/types';
import { TW_CLASS } from '../const/tailwind.const';
import { FormControl } from '@angular/forms';
import {
  MaxLengthTruncateDirective,
  CustomInputTextDirective,
} from 'ngx-cygnus-ui/directives';
import { CodePhone, SelectIconOption } from 'ngx-cygnus-ui/interfaces';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'cygnus-menu-phone-input',
  imports: [
    NgxCygnusIconsComponent,
    MaxLengthTruncateDirective,
    CustomInputTextDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-menu-phone-input.component.html',
})
export class CygnusMenuPhoneInputComponent {
  private static idCounter = 0;

  TW_CLASS = TW_CLASS; // esto fue creado para reemplazar @apply de tailwind, ya la documentación de tailwind 4 recomienda no usar @apply y se dice que no funciona muy bien en angular.

  control = input<FormControl<string>>();

  inputId = signal<string>('');
  inputSelectId = signal<string>('');
  inputCustomType = input<InputCustomType>('base');
  inputColor = input<InputColor>('base');
  inputSize = input<InputSize>('');
  iconColor = input<IconColorText>('black');
  iconSize = input<IconTextSize>('lg');
  hintColor = input<boolean>(false);
  textLabel = input<string>('');
  textHint = input<string>('');
  textPlaceholder = input<string>(' ');
  inputDisabled = input<boolean>(false);
  typePassword = input<boolean>(false);
  inputClearValue = input<boolean>(false);

  isInvisiblePhoneDrop = signal<boolean>(true);
  menuSearchTextPhoneDrop = signal<string>('');
  menuSearchIconPhoneDrop = signal<SafeHtml>('');
  menuSearchContentArr = signal<SelectIconOption[]>([]);

  cygnusInput = viewChild<ElementRef>('cygnusInput');
  iconClicked = output<string>();

  initializeInputValue = input<string>('');
  inputCodeOutput = output<string>();
  inputValueOutput = output<string>();
  inputIsBlur = output<boolean>();

  gradientBorder = input<boolean>(false);

  // Nuevos controles para la directiva MaxLengthTruncateDirective
  useTruncate = input<boolean>(false);
  truncateLength = input<number>(9);
  onlyNumbers = input<boolean>(true); // Para activar/desactivar la lógica

  customInputTextEnabled = input<boolean>(false);
  customInputTextMaxLength = input<number>(200);
  customInputTextMinLength = input<number>(5);

  textEmpresaEnabled = input<boolean>(false);
  textEmpresaMaxLength = input<number>(100);
  textEmpresaMinLength = input<number>(2);

  // input para definir qué código queremos por defecto
  defaultCode = input<string>('+56');
  codeDataArr = input<CodePhone[]>([]);

  constructor() {
    effect(() => {
      const val = this.initializeInputValue(); // señal reactiva
      const input = this.cygnusInput();
      if (input) {
        input.nativeElement.value = val;
        input.nativeElement.textContent = val;
      }
    });

    effect(() => {
      if (!this.inputClearValue()) {
        const input = this.cygnusInput();
        if (input) {
          input.nativeElement.textContent = '';
          input.nativeElement.value = '';
        }
      }
    });

    // Este efecto se ejecutará cuando codeDataArr cambie
    effect(() => {
      if (this.codeDataArr().length > 0) {
        this.codeDataToSelect();
      }
    });
  }

  ngOnInit() {
    // Generar ID único si no se proporciona
    this.inputId.set(`cg-input-${++CygnusMenuPhoneInputComponent.idCounter}`);
    this.inputSelectId.set(`cg-input-select-${++CygnusMenuPhoneInputComponent.idCounter}`);
    this.codeDataToSelect();
  }

  ngAfterViewInit() {
    this.cygnusInput()!.nativeElement.value  = this.initializeInputValue();
    this.cygnusInput()!.nativeElement.textContent = this.initializeInputValue();
  }

  getFlagUrl(codigo: string): string {
    return `https://flagcdn.com/w40/${codigo.toLowerCase()}.png`;
  }

  codeDataToSelect() {
    if (this.codeDataArr().length > 0) {

      // Mapeamos los datos (es más eficiente que hacer múltiples updates en un loop)
      const mappedOptions: SelectIconOption[] = this.codeDataArr().map(elem => ({
        option: elem.Nombre,
        value: elem.CodigoTelefonico,
        icon: this.getFlagUrl(elem.CodigoISO)
      }));

      this.menuSearchContentArr.set(mappedOptions);

      // Buscar el país que coincida con el defaultCode
      const found = mappedOptions.find(item => item.value === this.defaultCode()) || mappedOptions[0];

      if (found) {
        this.menuSearchTextPhoneDrop.set(found.value);
        this.menuSearchIconPhoneDrop.set(found.icon as SafeHtml);
        this.inputCodeOutput.emit(found.value);
      }
    }
  }

  toggleInvisiblePhoneDrop() {
    this.isInvisiblePhoneDrop.set(!this.isInvisiblePhoneDrop()); // invisibilizar opciones
  }

  selectMenuPhoneDrop(selected: string, icon: SafeHtml, index: number) {
    this.menuSearchTextPhoneDrop.set(selected);
    this.inputCodeOutput.emit(selected);
    this.menuSearchIconPhoneDrop.set(icon);
    this.isInvisiblePhoneDrop.set(true); // invisibilizar opciones
  }

  setInputIsBlur(value: string): void {
    this.setValue(value);
    this.inputIsBlur.emit(true);
  }

  setValue(value:string ) {
    this.control()?.setValue(value);
    this.control()?.markAsDirty();
    this.control()?.markAsTouched();
    this.inputValueOutput.emit(value);
    this.inputCodeOutput.emit(this.menuSearchTextPhoneDrop());
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) { // invisibilizar el menu cuando se haga click fuera de él
    if (
      !(event.target == document.getElementById(this.inputSelectId())) && // si NO se hace click en dropdown
      !(document.getElementById(this.inputSelectId())?.contains(event.target as Node)) // si NO se hace click en hijos del dropdown
    ) {
      if (!this.isInvisiblePhoneDrop()) this.isInvisiblePhoneDrop.set(true); // invisibilizar opciones
    }
  }
}
