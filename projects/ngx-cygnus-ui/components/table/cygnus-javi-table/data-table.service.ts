import { Injectable } from '@angular/core';
import { FavoriteConfig } from './data-table.models';

@Injectable({ providedIn: 'root' })
export class DataTableFavoritesService {

  load(storageKey: string): FavoriteConfig[] {
    return JSON.parse(localStorage.getItem(storageKey) ?? '[]');
  }

  save(storageKey: string, favorites: FavoriteConfig[]): void {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }

  getActive(storageKey: string): string | null {
    return localStorage.getItem(`${storageKey}_active`);
  }

  setActive(storageKey: string, name: string): void {
    localStorage.setItem(`${storageKey}_active`, name);
  }

  clearActive(storageKey: string): void {
    localStorage.removeItem(`${storageKey}_active`);
  }
}
