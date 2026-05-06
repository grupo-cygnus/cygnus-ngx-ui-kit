import { ChangeDetectionStrategy, Component, HostListener, input, model, OnInit, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { TW_CLASS } from '../const/tailwind.const';
import { SelectCollectOptions, SelectGeneric } from 'ngx-cygnus-ui/interfaces';
import { CygnusBadgeComponent } from 'ngx-cygnus-ui/components/badge';

@Component({
  selector: 'cygnus-menu-search-select',
  imports: [
    ReactiveFormsModule,
    NgxCygnusIconsComponent,
    CygnusBadgeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-menu-search-select.component.html',
})
export class CygnusMenuSearchSelectComponent implements OnInit {
  private static idCounter = 0;
  drowpdownSearchId = signal<string>('');
  drowpdownSearchBtnId = signal<string>('');

  inputSearchId = signal<string>('');
  inputSearchBtnId = signal<string>('');

  TW_CLASS = TW_CLASS;

  isInvisible = signal<boolean>(true);

  menuSearchContentArr = input<SelectCollectOptions[]>([]);
  menuSearchDefaultText = input<string>('Todas las categorías');

  menuSearchText = signal<string>('');

  searchControl = new FormControl('');
  items = signal<SelectGeneric[]>([]);
  filteredItems:SelectGeneric[] = [];
  emptyItemSelected: SelectGeneric = {value: null, option: ''};
  itemSelected = signal<SelectGeneric>(this.emptyItemSelected);

  isInvisibleOptions = signal<boolean>(true);

  placeholder = input<string>('Buscar...');

  showOptionsAutomatically = model<boolean>(false);
  outputSearch = output<string | [string, SelectGeneric]>();

  multisearch = model<boolean>(false);
  multisearchArr:SelectGeneric[] = [];
  outputMultisearch = output<SelectCollectOptions>();

  ngOnInit() {
    // Generar ID único si no se proporciona
    this.drowpdownSearchId.set(`cg-dropdown-search-${++CygnusMenuSearchSelectComponent.idCounter}`);
    this.drowpdownSearchBtnId.set(`cg-dropdown-search-btn-${++CygnusMenuSearchSelectComponent.idCounter}`);

    this.inputSearchId.set(`cg-input-search-id-${++CygnusMenuSearchSelectComponent.idCounter}`);
    this.inputSearchBtnId.set(`cg-input-search-btn-${++CygnusMenuSearchSelectComponent.idCounter}`);

    this.menuSearchText.set(this.menuSearchDefaultText());

    if (this.multisearch()) { // multisearch funciona mejor cuando se muestran automáticamente las opciones mientras se escribe
      this.showOptionsAutomatically.set(true);
    }

    // mostrar opciones según menú seleccionado
    if (this.showOptionsAutomatically()) {
      this.searchControl.valueChanges.pipe(debounceTime(150)).subscribe(value => {
        if (value != '' && value != null && value != undefined && this.itemSelected().option!=value) {
          this.filteredItems = this.items().filter( item =>
            item.option.toString().toUpperCase().includes(value.toUpperCase())
          );
          this.isInvisibleOptions.set(false);
        } else {
          this.filteredItems = [];
          this.isInvisibleOptions.set(true);
        }
      });
    }

  }

  toggleInvisible() {
    this.isInvisible.set(!this.isInvisible()); // invisibilizar opciones
  }

  toggleShowMenu() {
    if (this.filteredItems.length<1) {
      this.filteredItems = this.items();
    }
    this.isInvisibleOptions.update( value => !value ); // invisibilizar opciones
  }

  selectMenu(selected: string, index: number) {
    this.menuSearchText.set(selected);
    this.isInvisible.set(true); // invisibilizar opciones
    this.items.set(this.menuSearchContentArr()[index].selects); // se debe mostrar en la búsqueda los items correspondientes al menu seleccionado
    this.multisearchArr = []; // inicializar listado de opciones seleccionadas
  }

  setInputSearchAfterChooseOption(item: SelectGeneric) {
    if (this.multisearch()) {
      const foundSearch: SelectGeneric | undefined = this.multisearchArr.find(itemSearch => itemSearch.option === item.option );
      if (!foundSearch) { // ver si el elemento ya está en la lista antes de agregarlo otra vez
        this.multisearchArr.push(item);
      }
      this.searchControl.patchValue('');
      this.isInvisible.set(true);
      this.sendSearchMultisearch();
    } else {
      this.itemSelected.set(item);
      this.searchControl.patchValue(item.option);
      this.isInvisibleOptions.set(true);
    }
  }

  deleteMultisearchItem(item: SelectGeneric) {
    this.multisearchArr = this.multisearchArr.filter(s => s !== item);
    this.sendSearchMultisearch(); // enviar evento para actualizar el multisearch vigente
  }

  sendSearchMultisearch() {
    this.outputMultisearch.emit({key:this.menuSearchText(), selects:this.multisearchArr}); // SelectCollectOptions
  }

  sendSearch() {
    if (!this.showOptionsAutomatically()) {
      this.outputSearch.emit(this.searchControl.value || '');
    } else {
      this.outputSearch.emit([ this.searchControl.value || '', this.itemSelected()||this.emptyItemSelected ]);
      this.itemSelected.set(this.emptyItemSelected);
    }
    this.searchControl.patchValue('');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (
      !(event.target == document.getElementById(this.drowpdownSearchId())) && // si NO se hace click en dropdown
      !(document.getElementById(this.drowpdownSearchId())?.contains(event.target as Node)) // si NO se hace click en hijos del dropdown
    ) {
      if (!this.isInvisible()) this.isInvisible.set(true); // invisibilizar opciones
    }

    if (

        !(event.target == document.getElementById(this.inputSearchId())) && // si NO se hace click en input
        !(document.getElementById(this.inputSearchId())?.contains(event.target as Node)) // si NO se hace click en hijos del input
        &&
        !(event.target == document.getElementById(this.inputSearchBtnId())) && // si NO se hace click en input
        !(document.getElementById(this.inputSearchBtnId())?.contains(event.target as Node)) // si NO se hace click en hijos del input

    ) {
      if (!this.isInvisibleOptions()) this.isInvisibleOptions.set(true); // invisibilizar opciones
    }
  }

}
