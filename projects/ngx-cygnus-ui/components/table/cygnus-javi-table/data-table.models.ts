export type ColumnType = 'text' | 'number' | 'money' | 'date' | 'datetime';

export interface ColumnConfig {
  label: string;
  type?: ColumnType;
}

export type ColumnsMap = Record<string, string | ColumnConfig>;

export interface RowAction<T = any> {
  label: string;
  className?: string;
  callback: (item: T, index: number) => void;
}

export interface GlobalAction<T = any> {
  label: string;
  className?: string;
  callback: (selectedItems: T[]) => void;
}

export interface FavoriteConfig {
  name: string;
  hiddenColumns: string[];
  sortKey: string;
  sortOrder: 'asc' | 'desc';
}

export interface DataTableConfig<T = any> {
  rowIdKey?: string; // Ej: 'uuid', 'id', 'codigo', etc.
  data: T[];
  columns: ColumnsMap;
  viewMode?: 'cards' | 'table';
  actions?: RowAction<T>[];
  actionLabel?: string;
  globalActions?: GlobalAction<T>[];
  useCheckboxes?: boolean;
  showDynamicView?: boolean;
  startWithLabels?: boolean;
  favoritesId?: string;
}
