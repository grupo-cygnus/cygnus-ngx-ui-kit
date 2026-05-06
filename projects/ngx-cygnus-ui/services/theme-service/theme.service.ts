import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Inicializamos el signal leyendo de localStorage o del sistema
  readonly theme = signal<'light' | 'dark'>(this.#getInitialTheme());

  constructor() {
    // Aplicamos el tema inicial al cargar la app
    this.#applyToDom(this.theme());
  }

  /**
   * Cambia entre modo claro y oscuro
   */
  toggleTheme(): void {
    const nextTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
  }

  /**
   * Establece un tema específico de forma optimizada
   */
  setTheme(value: 'light' | 'dark'): void {
    // 1. CAMBIO INSTANTÁNEO EN EL DOM
    // Esto hace que el CSS de Tailwind se aplique de inmediato sin esperar a Angular
    this.#applyToDom(value);

    // 2. CAMBIO DIFERIDO EN ANGULAR
    // Usamos setTimeout(..., 0) para enviar la actualización del Signal
    // a la siguiente tarea del navegador. Esto evita que el procesamiento
    // de los inputs con sus directivas bloquee la animación visual.
    setTimeout(() => {
      this.theme.set(value);
      this.#saveToStorage(value);
    }, 0);
  }

  /**
   * Lógica interna para manipular las clases del documento
   */
  #applyToDom(value: 'light' | 'dark'): void {
    const root = document.documentElement;
    if (value === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }

  #getInitialTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) return saved;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  #saveToStorage(value: 'light' | 'dark'): void {
    try {
      localStorage.setItem('theme', value);
    } catch (e) {
      console.error('No se pudo guardar el tema en localStorage', e);
    }
  }
}
