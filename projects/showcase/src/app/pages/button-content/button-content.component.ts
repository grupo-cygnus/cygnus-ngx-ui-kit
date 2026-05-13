import { Component } from '@angular/core';
import {
  CygnusButtonComponent,
  CygnusButtonLinkComponent,
  CygnusButtonHoverAnimationComponent,
} from 'ngx-cygnus-ui/components/button';

import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-button-content',
  imports: [
    CygnusButtonComponent,
    CygnusButtonLinkComponent,
    CygnusButtonHoverAnimationComponent,
    Highlight, HighlightLineNumbers,
],
  templateUrl: './button-content.component.html',
  styleUrl: './button-content.component.scss'
})
export class ButtonContentComponent {

  cygnusButtonImport: string = `
    import { Component } from '@angular/core';
    import {
      CygnusButtonComponent,
      CygnusButtonLinkComponent,
      CygnusButtonHoverAnimationComponent,
    } from 'ngx-cygnus-ui/components/button';

    @Component({
      selector: 'app-button-content',
      imports: [
        CygnusButtonComponent,
        CygnusButtonLinkComponent,
        CygnusButtonHoverAnimationComponent,
      ],
      templateUrl: './button-content.component.html',
      styleUrl: './button-content.component.scss'
    })
    export class ButtonContentComponent {}
  `;

  btnSimpleExample: string = `
    <!-- COMPONENTE: Botón Sólido/simple/primary -->
    <cygnus-button [btnTypes]="'btn btn-size-sm'" >Botón simple</cygnus-button>
  `;

  btnSimpleExampleTs: string = `
    import { Component } from '@angular/core';
    import { CygnusButtonComponent } from 'ngx-cygnus-ui/components/button';

    @Component({
      selector: 'app-button-content',
      imports: [
        CygnusButtonComponent,
      ],
      templateUrl: './button-content.component.html',
      styleUrl: './button-content.component.scss'
    })
    export class ButtonContentComponent {}
  `;

  btnNavbarExample: string = `
    <!-- COMPONENTE: Botón Navbar -->
    <cygnus-button-link
      [btnLinkType]="'btn-link-navbar'"
      [btnRouterLinkText]="''"
    >
      Botón Navbar
    </cygnus-button-link>
    <!-- COMPONENTE: Botón Sidebar -->
    <cygnus-button [btnTypes]="'btn btn-sidebar btn-size-sm'" >Botón sidebar</cygnus-button>
  `;

  btnNavbarExampleTs: string = `
    import { Component } from '@angular/core';
    import { CygnusButtonLinkComponent, CygnusButtonComponent } from 'ngx-cygnus-ui/components/button';

    @Component({
      selector: 'app-button-content',
      imports: [
        CygnusButtonLinkComponent,
        CygnusButtonComponent,
      ],
      templateUrl: './button-content.component.html',
      styleUrl: './button-content.component.scss'
    })
    export class ButtonContentComponent {}
  `;

  btnVariantesExample: string = `
    <!-- COMPONENTE: Botón fantasma -->
    <cygnus-button [btnTypes]="'btn-ghost'" >Fantasma</cygnus-button>
    <!-- COMPONENTE: Botón fantasma gris -->
    <cygnus-button [btnTypes]="'btn-ghost-gray'" >Fantasma Gris</cygnus-button>
    <!-- COMPONENTE: Botón Outline -->
    <cygnus-button [btnTypes]="'btn-outlined'" >Outline</cygnus-button>
    <!-- COMPONENTE: Botón Sólido/simple/primary -->
    <cygnus-button [btnTypes]="'btn'" >Sólido</cygnus-button>
  `;

  btnOutlinedVariantesExample: string = `
    <!-- COMPONENTE: Botón Outline Red -->
    <cygnus-button [btnTypes]="'btn-outlined-red'" >Botón Outlined Red</cygnus-button>
    <!-- COMPONENTE: Botón Outline Verde -->
    <cygnus-button [btnTypes]="'btn-outlined-green'" >Botón Outlined Verde</cygnus-button>
    <!-- COMPONENTE: Botón Outline Amber -->
    <cygnus-button [btnTypes]="'btn-outlined-amber'" >Botón Outlined Amber</cygnus-button>
    <!-- COMPONENTE: Botón Outline Gris -->
    <cygnus-button [btnTypes]="'btn-outlined-gray'" >Botón Outlined Gris</cygnus-button>
    <!-- COMPONENTE: Botón Outline Cygnus -->
    <cygnus-button [btnTypes]="'btn-outlined-cygnus'" >Botón Outline Cygnus</cygnus-button>
  `;

  btnOutlinedVariantesTransparent: string = `
    <div class="flex items-center justify-center w-full gap-4 mb-4">
      <div class="flex flex-wrap justify-center gap-4 item bg-gray-900 pt-5 pb-5">

        <!-- COMPONENTE: Botón Outlined -->
        <cygnus-button [btnTypes]="'btn-outlined'" [btnIconOutlinedTransparent]="false" >Botón Outlined</cygnus-button>
        <!-- COMPONENTE: Botón Outline Red -->
        <cygnus-button [btnTypes]="'btn-outlined-red'" [btnIconOutlinedTransparent]="false" >Botón Outlined Red</cygnus-button>
        <!-- COMPONENTE: Botón Outline Verde -->
        <cygnus-button [btnTypes]="'btn-outlined-green'" [btnIconOutlinedTransparent]="false" >Botón Outlined Verde</cygnus-button>
        <!-- COMPONENTE: Botón Outline Amber -->
        <cygnus-button [btnTypes]="'btn-outlined-amber'" [btnIconOutlinedTransparent]="false" >Botón Outlined Amber</cygnus-button>
        <!-- COMPONENTE: Botón Outline Gris -->
        <cygnus-button [btnTypes]="'btn-outlined-gray'" [btnIconOutlinedTransparent]="false" >Botón Outlined Gris</cygnus-button>
        <!-- COMPONENTE: Botón Outline Cygnus -->
        <cygnus-button [btnTypes]="'btn-outlined-cygnus'" [btnIconOutlinedTransparent]="false" >Botón Outline Cygnus</cygnus-button>

      </div>
    </div>

    <div class="flex items-center justify-center w-full gap-4 mb-4">
      <div class="flex flex-wrap justify-center gap-4 item bg-gray-900 pt-5 pb-5">

        <!-- COMPONENTE: Botón Outlined -->
        <cygnus-button [btnTypes]="'btn-outlined'">Botón Outlined</cygnus-button>
        <!-- COMPONENTE: Botón Outline Red -->
        <cygnus-button [btnTypes]="'btn-outlined-red'">Botón Outlined Red</cygnus-button>
        <!-- COMPONENTE: Botón Outline Verde -->
        <cygnus-button [btnTypes]="'btn-outlined-green'">Botón Outlined Verde</cygnus-button>
        <!-- COMPONENTE: Botón Outline Amber -->
        <cygnus-button [btnTypes]="'btn-outlined-amber'">Botón Outlined Amber</cygnus-button>
        <!-- COMPONENTE: Botón Outline Gris -->
        <cygnus-button [btnTypes]="'btn-outlined-gray'">Botón Outlined Gris</cygnus-button>
        <!-- COMPONENTE: Botón Outline Cygnus -->
        <cygnus-button [btnTypes]="'btn-outlined-cygnus'">Botón Outline Cygnus</cygnus-button>

      </div>
    </div>
  `;

  btnColorsExample: string = `
    <!-- COMPONENTE: Botón primario -->
    <cygnus-button [btnTypes]="'btn-primary'" >Primario</cygnus-button>
    <!-- COMPONENTE: Botón secundario -->
    <cygnus-button [btnTypes]="'btn-secondary'" >Secundario</cygnus-button>
    <!-- COMPONENTE: Botón informativo -->
    <cygnus-button [btnTypes]="'btn-accent'" >Informativo</cygnus-button>
    <!-- COMPONENTE: Botón gris -->
    <cygnus-button [btnTypes]="'btn-gray'" >Gris</cygnus-button>
    <!-- COMPONENTE: Botón éxito -->
    <cygnus-button [btnTypes]="'btn-success'" >Éxito</cygnus-button>
    <!-- COMPONENTE: Botón red -->
    <cygnus-button [btnTypes]="'btn-error'" >Red</cygnus-button>
    <!-- COMPONENTE: Botón Advertencia -->
    <cygnus-button [btnTypes]="'btn-warning'" >Advertencia</cygnus-button>
    <!-- COMPONENTE: Botón enlace -->
    <cygnus-button-link
      [btnLinkType]="'btn-link'"
      [btnRouterLinkText]="''"
    >
      Botón enlace
    </cygnus-button-link>
    <!-- COMPONENTE: Botón enlace simple -->
    <cygnus-button-link
      [btnLinkType]="'btn-link-simple'"
      [btnRouterLinkText]="''"
    >
      Enlace simple
    </cygnus-button-link>
  `;

  btnColors2Example: string = `
    <cygnus-button [btnTypes]="'btn-indigo'" >Indigo</cygnus-button>
    <cygnus-button [btnTypes]="'btn-blue-violet'" >Blue Violet</cygnus-button>
    <cygnus-button [btnTypes]="'btn-cygnus'" >Cygnus</cygnus-button>
    <cygnus-button [btnTypes]="'btn-primary-cygnus'" >Primary Cygnus</cygnus-button>
    <cygnus-button [btnTypes]="'btn-accesibilidad-cygnus'" >Accesibilidad Cygnus</cygnus-button>
    <cygnus-button [btnTypes]="'btn-postulaaqui-orange'" >PostulaAqui Orange</cygnus-button>
    <cygnus-button [btnTypes]="'btn-full-gray'" >Full Gray</cygnus-button>
  `;

  btnSizesExample: string = `
    <cygnus-button [btnTypes]="'btn btn-size-xs'" >X Small</cygnus-button>
    <cygnus-button [btnTypes]="'btn btn-size-sm'" >Small</cygnus-button>
    <cygnus-button [btnTypes]="'btn'" >Medium</cygnus-button>
    <cygnus-button [btnTypes]="'btn btn-size-lg'" >Large</cygnus-button>
    <cygnus-button [btnTypes]="'btn btn-size-xl'" >X Large</cygnus-button>
  `;

  btnWithIconSizesExample: string = `
    <!-- COMPONENTE: Botón X Small -->
    <cygnus-button
      [btnTypes]="'btn-accent btn-size-xs btn-icon-sm'"
      [btnIconRouteLeft]="'assets/icons/svg/Arrows/refresh-cw-02.svg'"
      [btnIconRouteRight]="'assets/icons/svg/Arrows/arrow-narrow-right.svg'"
    >
      X small
    </cygnus-button>
    <!-- COMPONENTE: Botón Small -->
    <cygnus-button
      [btnTypes]="'btn-accent btn-size-sm btn-icon-sm'"
      [btnIconRouteLeft]="'assets/icons/svg/Arrows/refresh-cw-02.svg'"
      [btnIconRouteRight]="'assets/icons/svg/Arrows/arrow-narrow-right.svg'"
    >
      Small
    </cygnus-button>
    <!-- COMPONENTE: Botón Medium -->
    <cygnus-button
      [btnTypes]="'btn-accent btn-icon'"
      [btnIconRouteLeft]="'assets/icons/svg/Arrows/refresh-cw-02.svg'"
      [btnIconRouteRight]="'assets/icons/svg/Arrows/arrow-narrow-right.svg'"
    >
      Medium
    </cygnus-button>
    <!-- COMPONENTE: Botón Large -->
    <cygnus-button
      [btnTypes]="'btn-accent btn-size-lg btn-icon-lg'"
      [btnIconRouteLeft]="'assets/icons/svg/Arrows/refresh-cw-02.svg'"
      [btnIconRouteRight]="'assets/icons/svg/Arrows/arrow-narrow-right.svg'"
    >
      Large
    </cygnus-button>
    <!-- COMPONENTE: Botón X Large -->
    <cygnus-button
      [btnTypes]="'btn-accent btn-size-xl btn-icon-lg'"
      [btnIconRouteLeft]="'assets/icons/svg/Arrows/refresh-cw-02.svg'"
      [btnIconRouteRight]="'assets/icons/svg/Arrows/arrow-narrow-right.svg'"
    >
      X Large
    </cygnus-button>
  `;

  btnWithIconExample: string = `
    <!-- COMPONENTE: Botón fantasma -->
    <cygnus-button
      [btnTypes]="'btn-ghost btn-icon btn-icon-sm'"
      [btnIconRouteRight]="'assets/icons/svg/Arrows/chevron-right.svg'"
    >
      Leer más
    </cygnus-button>
    <!-- COMPONENTE: Botón Outline -->
    <cygnus-button
      [btnTypes]="'btn-outlined btn-icon btn-icon-sm'"
      [btnIconRouteRight]="'assets/icons/svg/Arrows/refresh-cw-02.svg'"
    >
      Recargar
    </cygnus-button>
    <!-- COMPONENTE: Botón Sólido Ícono izquierdo -->
    <cygnus-button
      [btnTypes]="'btn btn-icon'"
      [btnIconRouteLeft]="'assets/icons/svg/General/upload-cloud-01.svg'"
    >
      Ícono izquierdo
    </cygnus-button>
    <!-- COMPONENTE: Botón Sólido Ícono derecho -->
    <cygnus-button
      [btnTypes]="'btn btn-icon'"
      [btnIconRouteRight]="'assets/icons/svg/Users/face-smile.svg'"
    >
      Ícono derecho
    </cygnus-button>

    <cygnus-button-hover-animation
      [btnTypes]="'btn btn-icon'"
      [btnAnimationOption]="'A'"
    > <!-- [btnAnimationOption]="'A'" es el valor por defecto si no se indica -->
      Sobre Mi
    </cygnus-button-hover-animation>

    <cygnus-button-hover-animation
      [btnTypes]="'btn btn-icon-xs'"
      [btnAnimationOption]="'B'"
    >
      Sobre Mi
    </cygnus-button-hover-animation>
  `;

  btnDisabledExample: string = `
    <!-- COMPONENTE: Botón Deshabilitado -->
    <cygnus-button [btnTypes]="'btn-disabled'" >Botón Deshabilitado</cygnus-button>
  `;

  btnBlockExample: string = `
    <!-- COMPONENTE: Botón fantasma de bloque -->
    <cygnus-button [btnTypes]="'btn-ghost btn-block'" >Botón fantasma de bloque</cygnus-button>
    <!-- COMPONENTE: Botón "outline" de bloque -->
    <cygnus-button [btnTypes]="'btn-outlined btn-block'" >Botón "outline" de bloque</cygnus-button>
    <!-- COMPONENTE: Botón solido de bloque -->
    <cygnus-button [btnTypes]="'btn-primary btn-block'" >Botón sólido de bloque</cygnus-button>
  `;

  btnLoadingExample: string = `
    <cygnus-button
      [btnTypes]="'btn-ghost btn-size-sm btn-icon'"
      [btnIsLoading]="true"
      [btnIconLoadingSize]="'size-4'"
    >
      Cargando
    </cygnus-button>
    <cygnus-button
      [btnTypes]="'btn-outlined btn-size-sm btn-icon'"
      [btnIsLoading]="true"
      [btnIconLoadingSize]="'size-4'"
    >
      Cargando
    </cygnus-button>
    <cygnus-button
      [btnTypes]="'btn-primary btn-size-sm btn-icon'"
      [btnIsLoading]="true"
      [btnIconLoadingSize]="'size-4'"
    >
      Cargando
    </cygnus-button>
  `;

  btnIconOnlyExample: string = `
    <cygnus-button
      [btnTypes]="'btn-ghost btn-icon-only'"
      [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
    >
    </cygnus-button>
    <cygnus-button
      [btnTypes]="'btn-outlined btn-icon-only'"
      [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
    >
    </cygnus-button>
    <cygnus-button
      [btnTypes]="'btn-primary btn-icon-only'"
      [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
    >
    </cygnus-button>
  `;

  btnCircleIconOnlyExample: string = `
    <cygnus-button
      [btnTypes]="'btn-ghost btn-circle btn-icon-only'"
      [btnIconRouteRight]="'assets/icons/svg/Users/face-smile.svg'"
    >
    </cygnus-button>
    <cygnus-button
      [btnTypes]="'btn-outlined btn-circle btn-icon-only'"
      [btnIconRouteRight]="'assets/icons/svg/Users/face-smile.svg'"
    >
    </cygnus-button>
    <cygnus-button
      [btnTypes]="'btn-primary btn-circle btn-icon-only'"
      [btnIconRouteRight]="'assets/icons/svg/Users/face-smile.svg'"
    >
    </cygnus-button>

    <cygnus-button
      [btnTypes]="'btn-primary btn-circle btn-icon-only-size-full'"
      [btnIconRouteRight]="'accessible-03'"
    >
    </cygnus-button>

    <cygnus-button
      [btnTypes]="'btn-postulaaqui-orange btn-circle btn-icon-only-size-full'"
      [btnIconRouteRight]="'moon-01'"
    >
    </cygnus-button>

    <cygnus-button
      [btnTypes]="'btn-postulaaqui-orange btn-circle btn-icon-only'"
      [btnIconRouteRight]="'moon-01'"
    >
    </cygnus-button>
  `;

  btnIconOnlySizesExample: string = `
    <cygnus-button
      [btnTypes]="'btn-primary btn-icon-xl btn-icon-only-size-xs'"
      [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
    >
    </cygnus-button>
    <cygnus-button
      [btnTypes]="'btn-primary btn-icon-xl btn-icon-only-size-sm'"
      [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
    >
    </cygnus-button>
    <cygnus-button
      [btnTypes]="'btn-primary btn-icon-xl btn-icon-only'"
      [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
    >
    </cygnus-button>
    <cygnus-button
      [btnTypes]="'btn-primary btn-icon-xl btn-icon-only-size-lg'"
      [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
    >
    </cygnus-button>
    <cygnus-button
      [btnTypes]="'btn-primary btn-icon-xl btn-icon-only-size-xl'"
      [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
    >
    </cygnus-button>
  `;

  btnGroupSizesExample: string = `
    <!-- COMPONENTE: Grupo de botones small (colores) -->
    <div class="inline-flex flex-row">
      <cygnus-button
        [btnTypes]="'btn-success btn-size-xs btn-group-left'"
      >
        left btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-warning btn-size-xs btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-error btn-size-xs btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-ghost btn-size-xs btn-group-right'"
      >
        right btn
      </cygnus-button>
    </div>
    <!-- COMPONENTE: Grupo de botones small (primary color) -->
    <div class="inline-flex flex-row">
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-xs btn-group-left'"
      >
        left btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-xs btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-xs btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-xs btn-group-right'"
      >
        right btn
      </cygnus-button>
    </div>

    <!-- COMPONENTE: Grupo de botones medium (colores) -->
    <div class="inline-flex flex-row">
      <cygnus-button
        [btnTypes]="'btn-success btn-group-left'"
      >
        left btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-warning btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-error btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-ghost btn-group-right'"
      >
        right btn
      </cygnus-button>
    </div>
    <!-- COMPONENTE: Grupo de botones medium (primary color) -->
    <div class="inline-flex flex-row">
      <cygnus-button
        [btnTypes]="'btn-primary btn-group-left'"
      >
        left btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-group-right'"
      >
        right btn
      </cygnus-button>
    </div>

    <!-- COMPONENTE: Grupo de botones X large (colores) -->
    <div class="inline-flex flex-row">
      <cygnus-button
        [btnTypes]="'btn-success btn-size-xl btn-group-left'"
      >
        left btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-warning btn-size-xl btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-error btn-size-xl btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-ghost btn-size-xl btn-group-right'"
      >
        right btn
      </cygnus-button>
    </div>
    <!-- COMPONENTE: Grupo de botones X large (primary color) -->
    <div class="inline-flex flex-row">
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-xl btn-group-left'"
      >
        left btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-xl btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-xl btn-group-middle'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-xl btn-group-right'"
      >
        right btn
      </cygnus-button>
    </div>
  `;

  btnGroupVariantesExample: string = `
    <!-- COMPONENTE: Grupo de botones medium btn-ghost -->
    <div class="inline-flex flex-row">
      <cygnus-button
        [btnTypes]="'btn-ghost btn-size-sm btn-icon btn-group-left'"
        [btnIconRouteRight]="'assets/icons/svg/General/heart-hand.svg'"
      >
        left btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-ghost btn-size-sm btn-icon btn-group-middle'"
        [btnIconRouteRight]="'assets/icons/svg/General/tool-02.svg'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-ghost btn-size-sm btn-icon btn-group-right'"
        [btnIconRouteRight]="'assets/icons/svg/General/download-01.svg'"
      >
        right btn
      </cygnus-button>
    </div>

    <!-- COMPONENTE: Grupo de botones medium btn-outlined -->
    <div class="inline-flex flex-row">
      <cygnus-button
        [btnTypes]="'btn-outlined btn-size-sm btn-icon btn-group-left'"
        [btnIconRouteRight]="'assets/icons/svg/General/heart-hand.svg'"
      >
        left btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-outlined btn-size-sm btn-icon btn-group-middle'"
        [btnIconRouteRight]="'assets/icons/svg/General/tool-02.svg'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-outlined btn-size-sm btn-icon btn-group-right'"
        [btnIconRouteRight]="'assets/icons/svg/General/download-01.svg'"
      >
        right btn
      </cygnus-button>
    </div>

    <!-- COMPONENTE: Grupo de botones medium btn-primary -->
    <div class="inline-flex flex-row">
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-sm btn-icon btn-group-left'"
        [btnIconRouteRight]="'assets/icons/svg/General/heart-hand.svg'"
      >
        left btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-sm btn-icon btn-group-middle'"
        [btnIconRouteRight]="'assets/icons/svg/General/tool-02.svg'"
      >
        middle btn
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-size-sm btn-icon btn-group-right'"
        [btnIconRouteRight]="'assets/icons/svg/General/download-01.svg'"
      >
        right btn
      </cygnus-button>
    </div>
  `;

  btnGradientExample1: string = `
    <div class="flex flex-wrap items-center w-full gap-3 mb-4">
      <!-- COMPONENTE: Botón primario -->
      <cygnus-button [btnTypes]="'btn-primary'" [gradientButton]="true" >Primario</cygnus-button>
      <!-- COMPONENTE: Botón secundario -->
      <cygnus-button [btnTypes]="'btn-secondary'" [gradientButton]="true" >Secundario</cygnus-button>
      <!-- COMPONENTE: Botón informativo -->
      <cygnus-button [btnTypes]="'btn-accent'" [gradientButton]="true" >Informativo</cygnus-button>
    </div>
  `;

  btnGradientExample2: string = `
  <div class="flex flex-wrap items-center w-full gap-3 mb-4">
    <!-- COMPONENTE: Botón gris -->
    <cygnus-button [btnTypes]="'btn-gray'" [gradientButton]="true" >Gris</cygnus-button>
    <!-- COMPONENTE: Botón éxito -->
    <cygnus-button [btnTypes]="'btn-success'" [gradientButton]="true" >Éxito</cygnus-button>
    <!-- COMPONENTE: Botón red -->
    <cygnus-button [btnTypes]="'btn-error'" [gradientButton]="true" >Red</cygnus-button>
    <!-- COMPONENTE: Botón Advertencia -->
    <cygnus-button [btnTypes]="'btn-warning'" [gradientButton]="true" >Advertencia</cygnus-button>
  </div>
  `;

  btnGradientExample3: string = `
    <div class="flex flex-wrap items-center w-full gap-3 mb-4">

      <cygnus-button
        [btnTypes]="'btn-ghost btn-icon-only'"
        [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
        [gradientButton]="true"
      >
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-outlined btn-icon-only'"
        [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
        [gradientButton]="true"
      >
      </cygnus-button>
      <cygnus-button
        [btnTypes]="'btn-primary btn-icon-only'"
        [btnIconRouteRight]="'assets/icons/svg/General/plus.svg'"
        [gradientButton]="true"
      >
      </cygnus-button>

    </div>
  `;

  btnPostulaaquiOrange: string = `
    <cygnus-button
      [btnTypes]="'btn-postulaaqui-orange btn-icon btn-icon-sm'"
      [btnIconRouteRight]="'refresh-cw-02'"
    >
      Qué hacemos
    </cygnus-button>
  `;

}
