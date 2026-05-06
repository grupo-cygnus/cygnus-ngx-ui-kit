import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { CygnusRadioButtonComponent } from 'ngx-cygnus-ui/components/radio-button';
import { DropdownItemData } from 'ngx-cygnus-ui/interfaces';
import { DropdownItemType } from 'ngx-cygnus-ui/types';

@Component({
  selector: 'cygnus-drowpdown-item',
  imports: [
    RouterLink,
    NgxCygnusIconsComponent,
    CygnusRadioButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-drowpdown-item.component.html',
})
export class CygnusDrowpdownItemComponent {
  dropdownItemType = input<DropdownItemType>('simple');
  itemContent = input<DropdownItemData>();
  itemSelectedEmit = output<DropdownItemData | undefined>();

  nonNullableFb = inject(NonNullableFormBuilder);

  radioForm = this.nonNullableFb.group({
    radiodrop: ['', [Validators.required]],
  });

  itemSelected() {
    this.itemSelectedEmit.emit(this.itemContent());
  }

}
