import { Component, input, output, inject, OnDestroy, ChangeDetectorRef, viewChild, ElementRef, effect } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';
import { VideoGrabado } from 'ngx-cygnus-ui/interfaces';
import { FormatTimePipe } from 'ngx-cygnus-ui/pipes';

@Component({
  selector: 'cygnus-video-recorder',
  standalone: true,
  imports: [
    NgxCygnusIconsComponent,
    FormatTimePipe,
  ],
  templateUrl: './cygnus-video-recorder.component.html',
})
export class CygnusVideoRecorderComponent implements OnDestroy {
  private sanitizer = inject(DomSanitizer);
  private cd = inject(ChangeDetectorRef);

  // Angular 19 Signal ViewChild
  videoLiveElement = viewChild<ElementRef<HTMLVideoElement>>('videoLive');

  duracionMaxima = input<number>(60);
  iniciaGrabacion = output<boolean>();
  reiniciar = output<boolean>();
  videoListo = output<VideoGrabado>();
  noHayVideoGrabado = output<boolean>();

  grabando = false;
  procesando = false;
  mostrarGrabacion = false;
  detenidoAutomaticamente = false;

  tiempo = '00:00';
  videoParaRevisar: VideoGrabado | null = null;
  urlVideoSegura: SafeUrl | null = null;

  private mediaRecorder: MediaRecorder | null = null;
  private pedazos: Blob[] = [];
  private segundos = 0;
  private intervalo: any;
  private streamActual: MediaStream | null = null;

  mostrarBotonEnviarGrabacion = input<boolean>(true);
  enviarGrabacion = input<boolean>(false);

  // Nueva variable para controlar el mensaje de estado final
  estadoFinal: 'enviando' | 'error' | null = null;

  constructor() {
    // Definir el efecto que reacciona a cambios
    effect(() => {
      // Acceder al valor de la señal con ()
      if (this.enviarGrabacion()) {
        this.confirmarEnvio(); // output en "videoListo"
      }
    });
  }

  async iniciar() {
    this.iniciaGrabacion.emit(true);
    this.resetearEstadoCompleto();
    this.mostrarGrabacion = true;
    this.cd.detectChanges();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      this.streamActual = stream;
      const videoEl = this.videoLiveElement()?.nativeElement;

      if (videoEl) {
        videoEl.srcObject = stream;
        videoEl.muted = true;
        await videoEl.play();
      }

      // Intentamos capturar en H264 (el estándar de MP4)
      const opciones = this.obtenerTipoSoportado();
      this.mediaRecorder = new MediaRecorder(stream, opciones);

      this.mediaRecorder.ondataavailable = (evento: BlobEvent) => {
        if (evento.data && evento.data.size > 0) {
          this.pedazos.push(evento.data);
        }
      };

      this.mediaRecorder.onstop = async () => {
        await this.prepararVideoParaRevision();
      };

      this.mediaRecorder.start();
      this.grabando = true;
      this.iniciarContador();

    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      alert('No se pudo acceder a la cámara o el formato no es compatible');
      this.resetearEstadoCompleto();
    }
  }

  private obtenerTipoSoportado(): MediaRecorderOptions {
    // Priorizamos tipos que usan H264 para máxima compatibilidad con MP4
    const tipos = [
      'video/mp4;codecs=h264',
      'video/webm;codecs=h264',
      'video/webm;codecs=vp9',
      'video/webm'
    ];

    for (const tipo of tipos) {
      if (MediaRecorder.isTypeSupported(tipo)) {
        return { mimeType: tipo };
      }
    }
    return {};
  }

  detener(automatico = false) {
    if (automatico) this.detenidoAutomaticamente = true;
    this.procesando = true;

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    this.grabando = false;
    this.detenerRecursosHardware();
  }

  private async prepararVideoParaRevision() {
    try {
      // 1. Creamos el Blob original
      const mimeTypeOriginal = this.mediaRecorder?.mimeType || 'video/webm';
      const blobOriginal = new Blob(this.pedazos, { type: mimeTypeOriginal });

      // 2. Lo convertimos en un FILE con extensión .mp4
      // Esto es lo que el servidor verá como un archivo MP4 real
      const nombreArchivo = `grabacion_${Date.now()}.mp4`;
      const archivoMp4 = new File([blobOriginal], nombreArchivo, {
        type: 'video/mp4',
      });

      const base64 = await this.blobABase64(archivoMp4);

      this.videoParaRevisar = {
        blob: archivoMp4, // Enviamos el File (que hereda de Blob)
        base64: base64,
        duracion: this.segundos,
        timestamp: Date.now(),
        tipo: 'video/mp4' // Forzamos el tipo en la interfaz
      };

      const objectUrl = URL.createObjectURL(archivoMp4);
      this.urlVideoSegura = this.sanitizer.bypassSecurityTrustUrl(objectUrl);

      this.pedazos = [];
      this.procesando = false;
      this.mostrarGrabacion = false;
      this.cd.detectChanges();

    } catch (error) {
      console.error('Error procesando video:', error);
      this.resetearEstadoCompleto();
    }
  }

  // confirmarEnvio() {
  //   if (this.videoParaRevisar) {
  //     this.videoListo.emit(this.videoParaRevisar);
  //   } else {
  //     this.noHayVideoGrabado.emit(true);
  //   }
  //   this.resetearEstadoCompleto();
  //   this.reiniciar.emit(true);
  // }

  confirmarEnvio() {
    if (this.videoParaRevisar) {
      this.estadoFinal = 'enviando';
      this.videoListo.emit(this.videoParaRevisar);
    } else {
      this.estadoFinal = 'error';
      this.noHayVideoGrabado.emit(true);
    }

    // Damos 2 segundos para que el usuario vea el mensaje antes de limpiar
    setTimeout(() => {
      this.limpiarDespuesDeEnvio();
    }, 2000);
  }

  descartarGrabacion() {
    this.resetearEstadoCompleto();
    this.reiniciar.emit(true);
  }

  private limpiarDespuesDeEnvio() {
    this.estadoFinal = null;
    this.resetearEstadoCompleto();
    this.reiniciar.emit(true);
  }

  private resetearEstadoCompleto() {
    this.detenerRecursosHardware();
    this.videoParaRevisar = null;
    this.urlVideoSegura = null;
    this.pedazos = [];
    this.segundos = 0;
    this.tiempo = '00:00';
    this.grabando = false;
    this.procesando = false;
    this.mostrarGrabacion = false;
    this.detenidoAutomaticamente = false;
    this.cd.detectChanges();
  }

  private detenerRecursosHardware() {
    clearInterval(this.intervalo);
    if (this.streamActual) {
      this.streamActual.getTracks().forEach(track => track.stop());
      this.streamActual = null;
    }
    const videoEl = this.videoLiveElement()?.nativeElement;
    if (videoEl) {
      videoEl.srcObject = null;
    }
  }

  private iniciarContador() {
    this.segundos = 0;
    this.tiempo = '00:00';
    this.intervalo = setInterval(() => {
      this.segundos++;
      this.tiempo = this.formatearTiempo(this.segundos);
      this.cd.markForCheck();

      if (this.segundos >= this.duracionMaxima()) {
        this.detener(true);
      }
    }, 1000);
  }

  formatearTiempo(totalSegundos: number): string {
    const mins = Math.floor(totalSegundos / 60);
    const secs = totalSegundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  private blobABase64(blob: Blob | File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  ngOnDestroy() {
    this.resetearEstadoCompleto();
  }
}
