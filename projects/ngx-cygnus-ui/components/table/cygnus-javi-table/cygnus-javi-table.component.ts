import {
  Component, OnInit, signal, computed,
  inject, ChangeDetectionStrategy,
  input, PLATFORM_ID
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableConfig, FavoriteConfig, ColumnsMap } from './data-table.models';
import { FormatValuePipe } from './format-value.pipe';
import { DataTableFavoritesService } from './data-table.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'cygnus-javi-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, FormatValuePipe],
  templateUrl: './cygnus-javi-table.component.html',
})
export class CygnusJaviTableComponent<T extends Record<string, any>> implements OnInit {
  // Basado en https://github.com/Javibluebell/vanilla-js-data-table-component

  private platformId = inject(PLATFORM_ID);

  // @Input({ required: true }) config!: DataTableConfig<T>;
  config = input.required<DataTableConfig<T>>();

  private favService = inject(DataTableFavoritesService);

  // ── Estado reactivo con Signals ──────────────────────────
  searchTerm    = signal('');
  sortKey       = signal('');
  sortOrder     = signal<'asc' | 'desc'>('asc');
  hiddenColumns = signal<Set<string>>(new Set());
  selectedItems = signal<Set<T>>(new Set());
  showLabels    = signal(true);
  viewMode      = signal<'cards' | 'table'>('table');
  showFavModal  = signal(false);
  favorites     = signal<FavoriteConfig[]>([]);
  activeFavName = signal<string | null>(null);

  // Debounce timer
  private searchTimer: any;

  // ── Computed: columnas visibles ───────────────────────────
  visibleColumns = computed(() => {
    return Object.entries(this.config().columns)
      .filter(([key]) => !this.hiddenColumns().has(key));
  });

  // ── Computed: datos filtrados y ordenados ─────────────────
  processedData = computed(() => {
    const term = this.searchTerm().toLowerCase();
    let data = this.config().data.filter(item =>
      Object.keys(this.config().columns).some(key =>
        String(item[key]).toLowerCase().includes(term)
      )
    );
    return this.sortData(data);
  });

  // ── Computed: estado del "Seleccionar visibles" ───────────
  allVisibleSelected = computed(() => {
    const data = this.processedData();
    return data.length > 0 && data.every(item => this.selectedItems().has(item));
  });

  hasSelection = computed(() => this.selectedItems().size > 0);

  storageKey = '';

  ngOnInit() {
    this.viewMode.set(this.config().viewMode ?? 'table');
    this.showLabels.set(this.config().startWithLabels ?? true);

    // Columnas ocultas por defecto (más de 6)
    const keys = Object.keys(this.config().columns);
    if (keys.length > 6) {
      this.hiddenColumns.set(new Set(keys.slice(6)));
    }

    // Favoritos
    if (this.config().favoritesId) {
      this.storageKey = `table_favs_${this.config().favoritesId}`;
      this.favorites.set(this.favService.load(this.storageKey));
      const active = this.favService.getActive(this.storageKey);
      if (active) {
        const fav = this.favorites().find(f => f.name === active);
        if (fav) this.applyFavorite(fav);
      }
    }
  }

  // ── Búsqueda con debounce ─────────────────────────────────
  onSearch(term: string) {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.searchTerm.set(term), 300);
  }

  clearSearch() { this.searchTerm.set(''); }

  // ── Ordenamiento ──────────────────────────────────────────
  onHeaderClick(key: string) {
    if (this.sortKey() === key) {
      if (this.sortOrder() === 'asc') this.sortOrder.set('desc');
      else { this.sortKey.set(''); this.sortOrder.set('asc'); }
    } else {
      this.sortKey.set(key);
      this.sortOrder.set('asc');
    }
    this.clearActiveFavorite();
  }

  onSortChange() { this.clearActiveFavorite(); }

  private sortData(data: T[]): T[] {
    const key = this.sortKey();
    if (!key) return [...data];

    const colConf = this.config().columns[key];
    const type = typeof colConf === 'object' ? colConf.type : 'text';

    return [...data].sort((a, b) => {
      let vA = a[key], vB = b[key];
      if (vA == null || vA === '') return 1;
      if (vB == null || vB === '') return -1;

      let cmp = 0;
      if (type === 'date' || type === 'datetime') {
        cmp = new Date(vA).getTime() - new Date(vB).getTime();
      } else if (typeof vA === 'number' && typeof vB === 'number') {
        cmp = vA - vB;
      } else {
        cmp = String(vA).localeCompare(String(vB));
      }
      return this.sortOrder() === 'asc' ? cmp : -cmp;
    });
  }

  // ── Checkboxes ────────────────────────────────────────────
  toggleItem(item: T) {
    const set = new Set(this.selectedItems());
    set.has(item) ? set.delete(item) : set.add(item);
    this.selectedItems.set(set);
  }

  toggleSelectAll() {
    const data = this.processedData();
    const set = new Set(this.selectedItems());
    if (this.allVisibleSelected()) {
      data.forEach(item => set.delete(item));
    } else {
      data.forEach(item => set.add(item));
    }
    this.selectedItems.set(set);
  }

  masterCheckboxState(): boolean | 'indeterminate' {
    const data = this.processedData();
    const allSel = data.every(i => this.selectedItems().has(i));
    const someSel = data.some(i => this.selectedItems().has(i));
    if (allSel && data.length > 0) return true;
    if (someSel) return 'indeterminate';
    return false;
  }

  // ── Columnas ──────────────────────────────────────────────
  toggleColumn(key: string, visible: boolean) {
    const set = new Set(this.hiddenColumns());
    visible ? set.delete(key) : set.add(key);
    this.hiddenColumns.set(set);
    this.clearActiveFavorite();
  }

  isColumnVisible(key: string) { return !this.hiddenColumns().has(key); }

  // ── Favoritos ─────────────────────────────────────────────
  applyFavorite(fav: FavoriteConfig) {
    this.hiddenColumns.set(new Set(fav.hiddenColumns));
    this.sortKey.set(fav.sortKey);
    this.sortOrder.set(fav.sortOrder);
    this.activeFavName.set(fav.name);
    this.favService.setActive(this.storageKey, fav.name);
  }

  saveFavorite(name: string) {
    if (!name.trim()) return;
    const fav: FavoriteConfig = {
      name,
      hiddenColumns: Array.from(this.hiddenColumns()),
      sortKey: this.sortKey(),
      sortOrder: this.sortOrder()
    };
    const updated = [...this.favorites(), fav];
    this.favorites.set(updated);
    this.favService.save(this.storageKey, updated);
    this.activeFavName.set(name);
    this.favService.setActive(this.storageKey, name);
    this.showFavModal.set(false);
  }

  deleteFavorite(index: number) {
    const updated = this.favorites().filter((_, i) => i !== index);
    this.favorites.set(updated);
    this.favService.save(this.storageKey, updated);
  }

  clearActiveFavorite() {
    if (this.activeFavName()) {
      this.activeFavName.set(null);
      this.favService.clearActive(this.storageKey);
    }
  }

  // ── Reset ─────────────────────────────────────────────────
  reset() {
    this.searchTerm.set('');
    this.sortKey.set('');
    this.sortOrder.set('asc');
    const keys = Object.keys(this.config().columns);
    this.hiddenColumns.set(new Set(keys.length > 6 ? keys.slice(6) : []));
    this.selectedItems.set(new Set());
    this.clearActiveFavorite();
  }

  // ── Acciones ──────────────────────────────────────────────
  runGlobalAction(callback: (items: T[]) => void) {
    const items = Array.from(this.selectedItems());
    if (!items.length) return;
    callback(items);
  }

  runRowAction(callback: (item: T, index: number) => void, item: T) {
    callback(item, this.config().data.indexOf(item));
  }

  // ── Export ────────────────────────────────────────────────
  exportToExcel() {
    // 1. Verificación de SSR
    if (!isPlatformBrowser(this.platformId)) return;

    const XLSX = (window as any)['XLSX'];
    const visibleKeys = this.visibleColumns().map(([key]) => key);

    if (!XLSX) {
      this.exportToCSV(visibleKeys);
      return;
    }

    const datos = this.processedData().map(obj => {
      const row: any = {};
      visibleKeys.forEach(key => {
        const conf = this.config().columns[key];
        row[key] = typeof conf === 'object'
          ? this.formatRaw(obj[key], conf.type)
          : obj[key];
      });
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(datos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, `reporte_${Date.now()}.xlsx`);
  }

  private exportToCSV(visibleKeys: string[]) {
    // 2. Verificación de SSR (usa document y URL)
    if (!isPlatformBrowser(this.platformId)) return;

    const headers = visibleKeys.map(key => {
      const c = this.config().columns[key];
      return typeof c === 'object' ? c.label : c;
    }).join(',');

    const rows = this.processedData().map(item =>
      visibleKeys.map(key => `"${String(item[key] ?? '').replace(/"/g, '""')}"`).join(',')
    );

    const blob = new Blob(['\uFEFF' + [headers, ...rows].join('\n')],
      { type: 'text/csv;charset=utf-8;' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `reporte_${Date.now()}.csv`;
    a.click();

    // Limpieza de memoria
    URL.revokeObjectURL(a.href);
  }

  private formatRaw(value: any, type: any): any {
    // Para excel se exporta el valor parseado, no el formateado para display
    if ((type === 'date' || type === 'datetime') && value) {
      return new Date(value);
    }
    return value;
  }

  getColumnType(key: string) {
    const conf = this.config().columns[key];
    return typeof conf === 'object' ? conf.type : undefined;
  }

  getColumnLabel(key: string) {
    const conf = this.config().columns[key];
    return typeof conf === 'object' ? conf.label : conf;
  }
}
