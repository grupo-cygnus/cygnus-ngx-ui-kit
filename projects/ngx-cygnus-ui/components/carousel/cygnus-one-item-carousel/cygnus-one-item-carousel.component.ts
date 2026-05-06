import { ChangeDetectionStrategy, Component, effect, inject, input, signal, untracked } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CarouselItem } from 'ngx-cygnus-ui/interfaces';

@Component({
  selector: 'cygnus-one-item-carousel',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-one-item-carousel.component.html',
  styleUrl: './cygnus-one-item-carousel.component.css'
})
export class CygnusOneItemCarouselComponent {
  // En lugar de manejar un array y un índice, el carousel recibe un item a la vez y anima la transición entre el anterior y el nuevo.

  item = input.required<CarouselItem>();
  autoPlay = input<boolean>(false);
  seconds = input<number>(5);

  private sanitizer = inject(DomSanitizer);

  // Item visible actualmente
  currentItem = signal<(CarouselItem & { trustedSvg: any }) | null>(null);
  // Item que está saliendo
  previousItem = signal<(CarouselItem & { trustedSvg: any }) | null>(null);

  isTransitioning = signal(false);

  // Cola por si llegan items mientras se anima
  private pendingItem: (CarouselItem & { trustedSvg: any }) | null = null;

  constructor() {
    // Reacciona a cambios del item externo
    effect(() => {
      const newItem = this.item();

      untracked(() => {
        const sanitized = {
          ...newItem,
          trustedSvg: this.sanitizer.bypassSecurityTrustHtml(newItem.svg)
        };

        if (!this.currentItem()) {
          // Primera vez, sin animación
          this.currentItem.set(sanitized);
          return;
        }

        if (this.isTransitioning()) {
          // Llego mientras animaba, encolar
          this.pendingItem = sanitized;
          return;
        }

        this.startTransition(sanitized);
      });
    });

    // Reacciona a cambios de autoPlay y seconds
    effect((onCleanup) => {
      const active = this.autoPlay();
      const intervalMs = this.seconds() * 1000;

      if (!active) return;

      const timer = setInterval(() => {
        untracked(() => {
          // Re-anima el item actual sin cambiar contenido
          const current = this.currentItem();
          if (!current || this.isTransitioning()) return;
          this.startTransition(current);
        });
      }, intervalMs);

      // Limpieza automática si autoPlay pasa a false o seconds cambia
      onCleanup(() => clearInterval(timer));
    });
  }

  private startTransition(incoming: CarouselItem & { trustedSvg: any }) {
    this.previousItem.set(this.currentItem());
    this.currentItem.set(incoming);
    this.isTransitioning.set(true);
  }

  handleAnimationEnd() {
    this.previousItem.set(null);
    this.isTransitioning.set(false);

    // Si llegó algo mientras animaba, procesarlo
    if (this.pendingItem) {
      const next = this.pendingItem;
      this.pendingItem = null;
      this.startTransition(next);
    }
  }

}
