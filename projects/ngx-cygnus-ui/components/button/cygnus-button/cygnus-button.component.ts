import { Component, effect, ElementRef, input, OnInit, signal, viewChild, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { IconColorText, IconTextSize, NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { IconLoadingSize } from 'ngx-cygnus-ui/types';
import { TW_CLASS } from '../const/tailwind.const';

@Component({
  selector: 'cygnus-button',
  imports: [NgxCygnusIconsComponent, NgClass],
  templateUrl: 'cygnus-button.component.html',
})
export class CygnusButtonComponent implements OnInit {
  TW_CLASS = TW_CLASS; // esto fue creado para reemplazar @apply de tailwind, ya la documentación de tailwind 4 recomienda no usar @apply y se dice que no funciona muy bien en angular.

  buttonElement = viewChild<ElementRef<HTMLButtonElement>>('btnRef');

  typeButtonStructure = input<string>('button');
  btnTypes = input<string>('btn');
  btnAllClasses:WritableSignal<string> = signal<string>('');
  btnIconExist: boolean = false;
  btnIconOnly: boolean = false;
  btnIconColor = signal<IconColorText>('white');
  btnIconSize: IconTextSize = 'lg';
  btnIconRouteRight = input<string>('');
  btnIconRouteLeft = input<string>('');
  btnIsLoading = input<boolean>(false);
  btnIconLoadingSize = input<IconLoadingSize>('size-4');
  btnIsDisabled = signal<boolean>(false);

  btnIconOutlined = signal<boolean>(false);
  btnIconOutlinedColor = signal<string>('');
  btnIconOutlinedTransparent = input<boolean>(true);
  btnPostulaaquiOrange = signal<boolean>(false);

  gradientButton = input<boolean>(false);

  constructor() {
    effect(() => { // actualizar color del botón cuando cambie this.btnTypes()
      this.btnIsDisabled.set(false);
      const setClasses = this.setBtnClasses(this.getBtnClasses(this.btnTypes()));
      this.btnAllClasses.set(setClasses);
    });
  }

  ngOnInit(){
    this.btnIconExist = false;
    this.btnIconOnly = false;
    this.btnIsDisabled.set(false);
    const setClasses = this.setBtnClasses(this.getBtnClasses(this.btnTypes()));
    this.btnAllClasses.set(setClasses);
  }


  getBtnClasses(stringClasses: string): string[] {
    return stringClasses.split(' ');
  }

  setBtnClasses(arrStringClasses: string[]): string {
    let stringClasses = this.TW_CLASS.BTN + ' ';
    for (let i = 0; i < arrStringClasses.length; i++) {
      const elem = arrStringClasses[i];
      stringClasses = stringClasses + (this.addTailwindClasses(elem) + ' ');
    }
    return stringClasses;
  }

  addTailwindClasses(customClass: string): string {
    this.btnIconOnly = false;
    switch (customClass) {
      case 'btn':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_PRIMARY;
      case 'btn-primary':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_PRIMARY;
      case 'btn-secondary':
        this.btnIconColor.set('lightblack');
        return this.TW_CLASS.BTN_SECONDARY;
      case 'btn-accent':
        this.btnIconColor.set('lightblue');
        return this.TW_CLASS.BTN_ACCENT;
      case 'btn-gray':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_GRAY;
      case 'btn-full-gray':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_FULL_GRAY;
      case 'btn-success':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_GREEN;
      case 'btn-warning':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_AMBER;
      case 'btn-error':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_RED;
      case 'btn-indigo':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_INDIGO;
      case 'btn-blue-violet':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_BLUE_VIOLET;
      case 'btn-cygnus':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_CYGNUS;
      case 'btn-primary-cygnus':
        this.btnIconColor.set('white');
        return this.TW_CLASS.BTN_PRIMARY_CYGNUS;
      case 'btn-accesibilidad-cygnus':
        this.btnIconColor.set('cygnus');
        return this.TW_CLASS.BTN_ACCESIBILIDAD_CYGNUS;
      case 'btn-postulaaqui-orange':
        this.btnPostulaaquiOrange.set(true);
        this.btnIconColor.set('postulaaqui-orange');
        this.btnIconOutlined.set(true);
        this.btnIconOutlinedColor.set('postulaaqui-orange');
        return this.TW_CLASS.BTN_POSTULAAQUI_ORANGE;
      case 'btn-sidebar':
        this.btnIconColor.set('blue');
        return this.TW_CLASS.BTN_SIDEBAR;
      case 'btn-ghost':
        this.btnIconColor.set('blue');
        return this.TW_CLASS.BTN_GHOST;
      case 'btn-ghost-gray':
        this.btnIconColor.set('gray');
        return this.TW_CLASS.BTN_GHOST_GRAY;
      case 'btn-outlined':
        this.btnIconColor.set('blue');
        this.btnIconOutlined.set(true);
        this.btnIconOutlinedColor.set('blue');
        return this.TW_CLASS.BTN_OUTLINED;
      case 'btn-outlined-red':
        this.btnIconColor.set('red');
        this.btnIconOutlined.set(true);
        this.btnIconOutlinedColor.set('red');
        return this.TW_CLASS.BTN_OUTLINED_RED;
      case 'btn-outlined-green':
        this.btnIconColor.set('green');
        this.btnIconOutlined.set(true);
        this.btnIconOutlinedColor.set('green');
        return this.TW_CLASS.BTN_OUTLINED_GREEN;
      case 'btn-outlined-amber':
        this.btnIconColor.set('amber');
        this.btnIconOutlined.set(true);
        this.btnIconOutlinedColor.set('amber');
        return this.TW_CLASS.BTN_OUTLINED_AMBER;
      case 'btn-outlined-gray':
        this.btnIconColor.set('secgray');
        this.btnIconOutlined.set(true);
        this.btnIconOutlinedColor.set('secgray');
        return this.TW_CLASS.BTN_OUTLINED_GRAY;
      case 'btn-outlined-cygnus':
        this.btnIconColor.set('cygnus');
        this.btnIconOutlined.set(true);
        this.btnIconOutlinedColor.set('cygnus');
        return this.TW_CLASS.BTN_OUTLINED_CYGNUS;
      case 'btn-disabled':
        this.btnIconColor.set('blue');
        this.btnIsDisabled.set(true);
        return this.TW_CLASS.BTN_DISABLED;
      case 'btn-block':
        return this.TW_CLASS.BTN_BLOCK;
      case 'btn-circle':
        return this.TW_CLASS.BTN_CIRCLE;
      case 'btn-pagination-circle-size':
        return '!px-3 !py-2';
      case 'btn-pagination-size':
        return '!px-3 !py-1.5';
      case 'btn-size-xs':
        return this.TW_CLASS.BTN_SIZE_XS;
      case 'btn-size-sm':
        return this.TW_CLASS.BTN_SIZE_SM;
      case 'btn-size-lg':
        return this.TW_CLASS.BTN_SIZE_LG;
      case 'btn-size-xl':
        return this.TW_CLASS.BTN_SIZE_XL;
      case 'btn-icon-xs':
        this.btnIconSize = 'xs';
        this.btnIconExist = true;
        return '';
      case 'btn-icon-sm':
        this.btnIconSize = 'sm';
        this.btnIconExist = true;
        return '';
      case 'btn-icon':
        this.btnIconSize = 'lg';
        this.btnIconExist = true;
        return '';
      case 'btn-icon-lg':
        this.btnIconSize = 'lg';
        this.btnIconExist = true;
        return '';
      case 'btn-icon-xl':
        this.btnIconSize = 'xl';
        this.btnIconExist = true;
        return '';
      case 'btn-icon-only':
        this.btnIconExist = true;
        this.btnIconOnly = true;
        this.btnIconSize = 'xl';
        return this.TW_CLASS.BTN_ICON_ONLY;
      case 'btn-icon-only-size-xs':
        this.btnIconExist = true;
        this.btnIconOnly = true;
        this.btnIconSize = 'xl';
        return this.TW_CLASS.BTN_ICON_ONLY_SIZE_XS;
      case 'btn-icon-only-size-sm':
        this.btnIconExist = true;
        this.btnIconOnly = true;
        this.btnIconSize = 'xl';
        return this.TW_CLASS.BTN_ICON_ONLY_SIZE_SM;
      case 'btn-icon-only-size-lg':
        this.btnIconExist = true;
        this.btnIconOnly = true;
        this.btnIconSize = 'xl';
        return this.TW_CLASS.BTN_ICON_ONLY_SIZE_LG;
      case 'btn-icon-only-size-xl':
        this.btnIconExist = true;
        this.btnIconOnly = true;
        this.btnIconSize = 'xl';
        return this.TW_CLASS.BTN_ICON_ONLY_SIZE_XL;
      case 'btn-icon-only-size-full':
        this.btnIconExist = true;
        this.btnIconOnly = true;
        this.btnIconSize = 'xxxxl';
        return this.TW_CLASS.BTN_ICON_ONLY_SIZE_FULL;
      case 'btn-group-left':
        return this.TW_CLASS.BTN_GROUP_LEFT;
      case 'btn-group-middle':
        return this.TW_CLASS.BTN_GROUP_MIDDLE;
      case 'btn-group-right':
        return this.TW_CLASS.BTN_GROUP_RIGHT;
      default:
        return '';
    }
  }

  onMouseEnter() {
    if (this.btnIconOutlined()) {
      this.btnIconColor.set('white');
    }
    if (this.btnIconColor()==='lightblack') {
      this.btnIconColor.set('seclightblue');
    }
  }

  onMouseLeave() {
    if (this.btnIconOutlined() && this.btnIconOutlinedColor()==='blue' ) {
      this.btnIconColor.set('blue');
    }
    if (this.btnIconOutlined() && this.btnIconOutlinedColor()==='red' ) {
      this.btnIconColor.set('red');
    }
    if (this.btnIconOutlined() && this.btnIconOutlinedColor()==='green' ) {
      this.btnIconColor.set('green');
    }
    if (this.btnIconOutlined() && this.btnIconOutlinedColor()==='amber' ) {
      this.btnIconColor.set('amber');
    }
    if (this.btnIconOutlined() && this.btnIconOutlinedColor()==='secgray' ) {
      this.btnIconColor.set('secgray');
    }
    if (this.btnIconOutlined() && this.btnIconOutlinedColor()==='cygnus' ) {
      this.btnIconColor.set('cygnus');
    }
    if (this.btnIconOutlined() && this.btnIconOutlinedColor()==='postulaaqui-orange' ) {
      this.btnIconColor.set('postulaaqui-orange');
    }
    if (this.btnIconColor()==='lightblack') {
      this.btnIconColor.set('white');
    }
    if (this.btnIconColor()==='seclightblue') {
      this.btnIconColor.set('lightblack');
    }
  }

  onTouchEnd() {
    // Simulamos la salida del cursor para devolver el color original
    setTimeout(() => {
      this.onMouseLeave();
      // También quitamos el foco del botón en mobile para evitar el borde extraño
      if (this.buttonElement()?.nativeElement) {
        this.buttonElement()?.nativeElement.blur();
      }
    }, 100);
  }

}


