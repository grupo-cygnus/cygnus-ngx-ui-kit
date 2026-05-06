import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { IconColorText, NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { CygnusButtonComponent, CygnusButtonLinkComponent } from 'ngx-cygnus-ui/components/button';
import { CygnusInputComponent } from 'ngx-cygnus-ui/components/input';
import { InputColor, BtnCustomType } from 'ngx-cygnus-ui/types';
import { TW_CLASS } from '../const/tailwind.const';
import { cgEmail, cgPhone, cgRutValidator } from 'ngx-cygnus-ui/validators';

@Component({
  selector: 'cygnus-card-show-validators',
  imports: [
    ReactiveFormsModule,
    NgxCygnusIconsComponent,
    CygnusInputComponent,
    CygnusButtonComponent,
    CygnusButtonLinkComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-card-show-validators.component.html',
})
export class CygnusCardShowValidatorsComponent implements OnInit {
  TW_CLASS = TW_CLASS; // esto fue creado para reemplazar @apply de tailwind, ya la documentación de tailwind 4 recomienda no usar @apply y se dice que no funciona muy bien en angular.
  CYGNUS_LOGO_COLOR: IconColorText = 'cygnus';

  textRutHint = signal<string>('');
  inputRutColor = signal<InputColor>('base');

  textPassHint = signal<string>('');
  inputPassColor = signal<InputColor>('base');

  textPhoneHint = signal<string>('');
  inputPhoneColor = signal<InputColor>('base');

  textMailHint = signal<string>('');
  inputMailColor = signal<InputColor>('base');

  btnSubmitColor = signal<BtnCustomType>('btn-disabled');

  inputClearValue = signal<boolean>(false);

  nonNullableFb = inject(NonNullableFormBuilder);

  cardLoginForm = this.nonNullableFb.group({
    rut: ['',
      [Validators.required, cgRutValidator()]
    ],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required, cgPhone()]],
    mail: ['', [Validators.required, cgEmail()]]
  });

  ngOnInit() {
    this.inputStatusManager();
    this.formStatusManager();
  }

  inputStatusManager() {
    this.cardLoginForm.get('rut')?.statusChanges.subscribe(status => {
      if (this.cardLoginForm.get('rut')?.errors) {
        this.inputRutColor.set('error');
        this.textRutHint.set('error');
      } else {
        this.inputRutColor.set('base');
        this.textRutHint.set('');
      }
    });
    this.cardLoginForm.get('password')?.statusChanges.subscribe(status => {
      if (this.cardLoginForm.get('password')?.errors) {
        this.inputPassColor.set('error');
        this.textPassHint.set('error');
      } else {
        this.inputPassColor.set('base');
        this.textPassHint.set('');
      }
    });
    this.cardLoginForm.get('phone')?.statusChanges.subscribe(status => {
      // console.log('phone errors: ',this.cardLoginForm.get('phone')?.errors);

      if (this.cardLoginForm.get('phone')?.errors) {
        this.inputPhoneColor.set('error');
        this.textPhoneHint.set('error');
      } else {
        this.inputPhoneColor.set('success');
        this.textPhoneHint.set('');
      }
    });
    this.cardLoginForm.get('mail')?.statusChanges.subscribe(status => {
      // console.log('mail errors: ',this.cardLoginForm.get('mail')?.errors);

      if (this.cardLoginForm.get('mail')?.errors) {
        this.inputMailColor.set('warning');
        this.textMailHint.set('warning');
      } else {
        this.inputMailColor.set('success');
        this.textMailHint.set('');
      }
    });
  }

  formStatusManager() {
    this.cardLoginForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        // console.log('form valid');
        this.btnSubmitColor.set('btn-primary');
      } else {
        // console.log('form no valid');
        this.btnSubmitColor.set('btn-disabled');
      }
    });
  }

  onSubmit() {
    if (this.btnSubmitColor()!=='btn-disabled') {
      // console.log('onSubmit: ',this.cardLoginForm.value);
      this.inputClearValue.set(true);
      this.cardLoginForm.markAllAsTouched();
    }
  }
}
