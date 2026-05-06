import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, untracked  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CarouselItem } from 'ngx-cygnus-ui/interfaces';

@Component({
  selector: 'cygnus-carousel',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-carousel.component.html',
})
export class CygnusCarouselComponent {

  // CONFIGURACIÓN
  // 'auto' para temporizador, 'manual' para esperar la señal
  mode = input<'auto' | 'manual'>('auto');

  seconds = input<number>(5);

  // Esta es la señal que viene de fuera.
  // Cada vez que el padre cambie este valor (ej. un timestamp o un contador), el carousel rotará.
  triggerNext = input<any>(null);

  itemsInput = input.required<CarouselItem[]>();

  private sanitizer = inject(DomSanitizer);

  // 2. Transformamos los items para que el SVG sea seguro
  // Esto se ejecuta solo cuando 'itemsInput' cambia
  items = computed(() => {
    const rawItems = this.itemsInput().map(item => ({
      ...item,
      trustedSvg: this.sanitizer.bypassSecurityTrustHtml(item.svg)
    }));
    // Agregamos el clon al final
    return rawItems.length > 0 ? [...rawItems, { ...rawItems[0], id: 'clone' }] : [];
  });

  currentIndex = signal(0);
  isTransitioning = signal(false); // Controla si la animación CSS está activa. Inicializar en false

  // Guardamos el último valor procesado para comparar
  private lastTriggerValue: any = null;
  private pendingSlides = 0; // Cola de slides pendientes


  constructor() {
    // El effect rastrea automáticamente seconds()
    // Cuando el input cambie, la función de limpieza (onCleanup) se ejecuta
    // y luego se vuelve a ejecutar el código del effect.
    effect((onCleanup) => {
      if (this.mode()==='auto') {

        const intervalMs = this.seconds() * 1000;

        const timer = setInterval(() => {
          this.next();
        }, intervalMs);

        // Limpieza automática si el componente se destruye o el input cambia
        onCleanup(() => {
          clearInterval(timer);
        });
      }
    });

    // EFECTO 2: Reacciona a la señal externa (triggerNext)
    effect(() => {
      // Al "leer" triggerNext, este bloque se ejecuta cada vez que cambie
      const trigger = this.triggerNext();

      // Solo avanza si:
      // 1. El modo es manual
      // 2. El trigger no es el valor inicial (null)
      // 3. El valor cambió respecto al último procesado
      if (
        this.mode() === 'manual' &&
        trigger !== null &&
        trigger !== undefined &&
        trigger !== this.lastTriggerValue  // <-- evita disparos duplicados
      ) {
        this.lastTriggerValue = trigger;
        // untracked para que el next() no cree dependencias reactivas inesperadas
        // untracked(() => this.next());
        untracked(() => this.enqueue()); // cola para permitir que se ejecuten cambios de slides más rápidos que lo que la animación permite
      }
    });
  }

  // Agrega a la cola e intenta procesar
  private enqueue() {
    this.pendingSlides++;
    this.processQueue();
  }

  // Procesa el siguiente slide solo si no hay transición activa
  private processQueue() {
    if (this.pendingSlides === 0) return;
    if (this.isTransitioning()) return; // espera que termine la animación actual

    this.pendingSlides--;
    this.next();
  }

  next() {
    // Si estamos en el clon (última posición), no hacemos nada hasta que el reset termine
    if (this.currentIndex() === this.items().length - 1) return;

    this.isTransitioning.set(true);
    this.currentIndex.update(i => i + 1);
  }

  handleTransitionEnd() {

    // if (this.currentIndex() === this.items().length - 1) {
    //   this.isTransitioning.set(false); // Quitamos la animación
    //   this.currentIndex.set(0);       // Saltamos al inicio real
    // }


    if (this.currentIndex() === this.items().length - 1) {
      // Reset infinito
      // Cuando la transición termina y estamos en el clon (último elemento)
      this.isTransitioning.set(false); // Quitamos la animación
      this.currentIndex.set(0);        // Saltamos al inicio real
      // Procesar siguiente pendiente después del reset
      setTimeout(() => this.processQueue());
    } else {
      this.isTransitioning.set(false);
      // Procesar siguiente pendiente
      this.processQueue();
    }
  }

  /*
  Flujo con 3 clicks rápidos
  Click ×3 rápido
    → pendingSlides = 3
    → processQueue() → isTransitioning=false → ejecuta next() → pendingSlides=2, isTransitioning=true

  [700ms después - transitionEnd]
    → isTransitioning=false
    → processQueue() → pendingSlides=1 → ejecuta next() → isTransitioning=true

  [700ms después - transitionEnd]
    → isTransitioning=false
    → processQueue() → pendingSlides=0 → ejecuta next() → isTransitioning=true

  [700ms después - transitionEnd]
    → isTransitioning=false
    → processQueue() → pendingSlides=0 → no hace nada ✅
  Los 3 clicks se ejecutan secuencialmente con 700ms entre cada uno, sin perder ninguno.

  */

}
