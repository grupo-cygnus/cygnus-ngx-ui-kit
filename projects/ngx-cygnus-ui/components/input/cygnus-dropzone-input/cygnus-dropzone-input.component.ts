import { Component, ElementRef, HostBinding, input, output, signal, viewChild } from '@angular/core';

import { CygnusButtonComponent } from 'ngx-cygnus-ui/components/button';

@Component({
  selector: 'cygnus-dropzone-input',
  imports: [
    CygnusButtonComponent,
  ],
  templateUrl: './cygnus-dropzone-input.component.html',
  styles: `
    /* Cuando el label tiene cursor default, permitimos que sus hijos
   (el botón) definan su propio cursor sin interferencias */
    label.cursor-default cygnus-button {
      cursor: alias !important;
    }

    /* Opcional: Si cygnus-button renderiza un <button> interno,
      necesitamos llegar hasta él */
    label.cursor-default cygnus-button :host-context(button),
    label.cursor-default cygnus-button button {
      cursor: alias !important;
    }
  `,
  host: {
    '[class.w-full]': 'wFull()', // Se vincula directamente a la ejecución de la signal
  }
})
export class CygnusDropzoneInputComponent {

  titleText = input<string>('');
  firstText = input<string>('');
  secondText = input<string>('');
  thirdText = input<string>('');
  btnText = input<string>('');
  onlyBtn = input<boolean>(false);
  horizontalText = input<boolean>(false);
  iconRight = input<boolean>(false);
  invisibleLabel = input<boolean>(false);
  wFull = input<boolean>(false);

  btnColor = input<string>('btn-blue-violet');
  gradientButton = input<boolean>(false);

  base64: string | null = null;
  fileName = signal<string>('');
  fileSize: number = 0;
  fileType: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  isDragging: boolean = false; // Para feedback visual

  inputErrorMsge = input<string>('Tipo de archivo no permitido. Solo se aceptan: PDF, JPG, PNG, DOC.');

  outputIniciaLectura = output<boolean>();
  outputFileName = output<string>();
  outputBase64 = output<string>();
  outputErrorMsge = output<string>();
  outputTypeError = output<string>(); // TYPE, SIZE, READER
  outputOnRemoveFile = output<void>();

  // Tipos de archivo permitidos
  allowedTypes = input({
    'application/pdf': '.pdf',
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/pjpeg': '.jpg',  // Formato JPEG progresivo
    'image/jfif': '.jpg',   // Otro formato JPEG común
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/docx': '.docx'
  });

  // Lista de extensiones permitidas
  allowedExtensions = input<string[]>(['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']);
  inputAccept = input<string>('application/pdf,.pdf,image/jpeg,.jpg,image/png,.png,.doc,.docx');

  // Límite en MB (por defecto 15)
  maxFileSizeUpload = input<number>(15);

  // Mensaje personalizable para error de tamaño
  sizeErrorMsge = input<string>('El archivo excede el tamaño máximo permitido.');

  // Nuevo Output para que el padre reciba el progreso en tiempo real
  outputProgress = output<number>();

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  uid = Math.random().toString(36).substring(2);

  // onRemoveFile(event: Event): void {
  //   event.preventDefault();
  //   event.stopPropagation(); // Evita que el click llegue al label y abra el selector

  //   this.resetFile();
  //   this.outputOnRemoveFile.emit();

  //   // Opcional: limpiar el input físico
  //   const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
  //   if (fileInput) fileInput.value = '';
  // }

  triggerFilePicker(event: Event): void {
    // Si estamos en modo "eliminar" (iconRight activo), no abrimos el selector
    if (this.iconRight()) {
      return;
    }

    // Abrimos el selector manualmente
    const inputEl = this.fileInput()?.nativeElement;
    if (inputEl) {
      inputEl.click();
    }
  }

  onRemoveFile(event: Event): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();

    this.resetFile();
    this.outputOnRemoveFile.emit();

    const inputEl = this.fileInput()?.nativeElement;
    if (inputEl) {
      inputEl.value = '';
      // Forzamos un ciclo de detección para que iOS vea el input vacío
      inputEl.type = 'text';
      setTimeout(() => {
        inputEl.type = 'file';
      }, 50);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      this.processFile(files[0]);
      // Limpiar el input file para permitir subir el mismo archivo después
      const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } else {
      console.log('No files found in drop event');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  processFile(file: File): void {
    this.outputIniciaLectura.emit(true);

    // 1. Validar tipo de archivo
    if (!this.isValidFileType(file)) {
      this.errorMessage = this.inputErrorMsge();
      this.outputErrorMsge.emit(this.errorMessage);
      this.outputTypeError.emit('TYPE');
      this.resetFile();
      return;
    }

    // 2. Validar tamaño de archivo (Nueva validación)
    // Convertimos MB a Bytes: MB * 1024 * 1024
    const maxBytes = this.maxFileSizeUpload() * 1024 * 1024;

    if (file.size > maxBytes) {
      this.errorMessage = `${this.sizeErrorMsge()} (Máx: ${this.maxFileSizeUpload()}MB)`;
      this.outputErrorMsge.emit(this.errorMessage);
      this.outputTypeError.emit('SIZE');
      this.resetFile();
      return;
    }

    // 3. Si pasa las validaciones, procedemos
    this.isLoading = true;
    this.errorMessage = '';
    this.fileName.set(file.name);
    this.fileSize = file.size;
    this.fileType = file.type;

    // Convertir a base64
    this.convertToBase64(file);
  }

  isValidFileType(file: File): boolean {

    // Obtener la extensión del archivo
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();

    // Validar primero por extensión (más confiable)
    if (this.allowedExtensions().includes(extension)) {
      return true;
    }

    // Validación secundaria por MIME type (como fallback)
    if (this.allowedTypes.hasOwnProperty(file.type)) {
      return true;
    }

    // Si ninguna validación pasa, rechazar el archivo
    console.log('Archivo rechazado:', {
      nombre: file.name,
      extension: extension,
      mimeType: file.type
    });

    return false;
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();

    // Dado que tu límite máximo son 15MB, la lectura en disco siempre será extremadamente rápida. Para que el usuario realmente vea un progreso (y no un salto del 0 al 100 instantáneo): Si quieres que el usuario vea números subiendo (1, 2, 3... 100) aunque el archivo sea pequeño, debes añadir un pequeño intervalo artificial. Esto mejora mucho la experiencia de usuario (UX).

    this.outputProgress.emit(0); // Forzamos el inicio en 0

    // --- TRUCO DE UX: Simulador para archivos pequeños ---
    let fakeProgress = 0;
    const interval = setInterval(() => {
      // Si el archivo es pequeño, aumentamos el progreso artificialmente
      // hasta un 90%, el 100% lo dará el 'onload' real.
      if (fakeProgress < 90) {
        fakeProgress += Math.floor(Math.random() * 15) + 5;
        if (fakeProgress > 90) fakeProgress = 90;
        this.outputProgress.emit(fakeProgress);
      }
    }, 60); // Cada 50ms sube un poco
    // -----------------------------------------------------

    // Evento de progreso
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        // Cálculo del porcentaje: (progreso actual / total) * 100
        const realPercent = Math.round((event.loaded / event.total) * 100);
        // Solo emitimos el real si es mayor al falso para no "retroceder"
        if (realPercent > fakeProgress && realPercent != 100) {
          this.outputProgress.emit(realPercent);
        }
      }
    };

    reader.onload = () => {
      // IMPORTANTE: Le damos un pequeño delay al éxito final
      // para que el usuario vea que la barra llegó lejos
      setTimeout(() => {
        clearInterval(interval); // Detener el simulador
        this.base64 = reader.result as string; // El resultado incluye el prefijo, ejemplo "data:application/pdf;base64,"
        this.outputProgress.emit(100);
        this.isLoading = false;
        // Enviar convertido
        this.outputFileName.emit(this.fileName());
        this.outputBase64.emit(this.base64);
      }, 300); // 300ms de "respiro" visual
    }

    reader.onerror = () => {
      clearInterval(interval); // Detener el simulador
      this.errorMessage = 'Error al leer el archivo';
      this.outputErrorMsge.emit(this.errorMessage);
      this.outputTypeError.emit('READER');
      this.isLoading = false;
      this.resetFile();
    };

    reader.readAsDataURL(file);
  }


  resetFile(): void {
    this.base64 = null;
    this.fileName.set('');
    this.fileSize = 0;
  }

}
