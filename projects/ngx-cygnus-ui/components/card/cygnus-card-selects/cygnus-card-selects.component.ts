import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { IconColorText, NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { CygnusButtonComponent, CygnusButtonLinkComponent } from 'ngx-cygnus-ui/components/button';
import { CygnusSelectComponent } from 'ngx-cygnus-ui/components/select';
import { BtnCustomType } from 'ngx-cygnus-ui/types';
import { TW_CLASS } from '../const/tailwind.const';
import { SelectGeneric } from 'ngx-cygnus-ui/interfaces';
import { specificValueValidator } from 'ngx-cygnus-ui/validators';

@Component({
  selector: 'cygnus-card-selects',
  imports: [
    ReactiveFormsModule,
    NgxCygnusIconsComponent,
    CygnusButtonComponent,
    CygnusButtonLinkComponent,
    CygnusSelectComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-card-selects.component.html',
})
export class CygnusCardSelectsComponent implements AfterViewInit {
TW_CLASS = TW_CLASS; // esto fue creado para reemplazar @apply de tailwind, ya la documentación de tailwind 4 recomienda no usar @apply y se dice que no funciona muy bien en angular.
  CYGNUS_LOGO_COLOR: IconColorText = 'cygnus';

  options: SelectGeneric[] = [
    {option: 'Valor 1', value: '0001'},
    {option: 'Valor 2', value: '0002'},
    {option: 'Valor 3', value: '0003'},
    {option: 'Valor 4', value: '0004'},
  ];
  selHint = signal<string>('');
  setState = signal<string>('');
  btnSubmitColor = signal<BtnCustomType>('btn-disabled');
  nonNullableFb = inject(NonNullableFormBuilder);

  cardSelForm = this.nonNullableFb.group({
    opt: ['',
      [Validators.required, specificValueValidator('0003')]
    ],
  });

  ngAfterViewInit() {
    this.selStatusManager();
    this.formStatusManager();
  }

  selStatusManager() {
    this.cardSelForm.get('opt')?.statusChanges.subscribe(status => {
      if (this.cardSelForm.get('opt')?.errors) {
        this.setState.set('error');
        this.selHint.set('error');
      } else {
        this.setState.set('success');
        this.selHint. set('');
      }
    });
  }

  formStatusManager() {
    this.cardSelForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        // console.log('form valid');
        // console.log(this.cardSelForm.controls.opt.value);
        this.btnSubmitColor.set('btn-primary');
      } else {
        // console.log('form no valid');
        this.btnSubmitColor.set('btn-disabled');
      }
    });
  }

  onSubmit() {
    if (this.btnSubmitColor()!=='btn-disabled') {
      // console.log('onSubmit: ',this.cardSelForm.value);
      this.cardSelForm.markAllAsTouched();
    }
  }
}
