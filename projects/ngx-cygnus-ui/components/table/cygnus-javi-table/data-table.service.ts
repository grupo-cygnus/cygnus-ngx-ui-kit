import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FavoriteConfig } from './data-table.models';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DataTableFavoritesService {
  private platformId = inject(PLATFORM_ID);

  // Helper para verificar si podemos usar Storage
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  load(storageKey: string): FavoriteConfig[] {
    if (!this.isBrowser) return []; // Retorna vacío en servidor
    return JSON.parse(localStorage.getItem(storageKey) ?? '[]');
  }

  save(storageKey: string, favorites: FavoriteConfig[]): void {
    if (this.isBrowser) {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    }
  }

  getActive(storageKey: string): string | null {
    return this.isBrowser ? localStorage.getItem(`${storageKey}_active`) : null;
  }

  setActive(storageKey: string, name: string): void {
    if (this.isBrowser) {
      localStorage.setItem(`${storageKey}_active`, name);
    }
  }

  clearActive(storageKey: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(`${storageKey}_active`);
    }
  }
}
