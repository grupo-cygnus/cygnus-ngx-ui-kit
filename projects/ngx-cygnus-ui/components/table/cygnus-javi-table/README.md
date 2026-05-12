# Instalación necesaria para que funcione CygnusJaviTableComponent

El desarrollador debe instalar SheetJS en su propio proyecto.

```
npm install xlsx
```

El desarrollador debe editar su archivo angular.json y añadir la ruta al script en la sección de scripts.

```
"architect": {
  "build": {
    "options": {
      "scripts": [
        "node_modules/xlsx/dist/xlsx.full.min.js"
      ]
    }
  }
}
```

Después de este cambio, es obligatorio reiniciar el servidor de desarrollo (ng serve) para que Angular incluya el script en el bundle.
