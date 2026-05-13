import { Component } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { CygnusJaviTableComponent, DataTableConfig } from 'ngx-cygnus-ui/components/table';

@Component({
  selector: 'app-table-javi-content',
  imports: [
    CygnusJaviTableComponent,
    Highlight, HighlightLineNumbers,
  ],
  templateUrl: './table-javi-content.component.html',
  styleUrl: './table-javi-content.component.scss'
})
export class TableJaviContentComponent {

  data = [
    {
      "cod": 1,
      "nombre": "javier",
      "puesto": "desarrollador",
      "ingreso": "2015"
    },
    {
      "cod": 2,
      "nombre": "claudia",
      "puesto": "front",
      "ingreso": "2025"
    },
  ];

  tableConfig: DataTableConfig = {
    data: this.data,
    columns: {
      nombre:  { label: 'Nombre',  type: 'text'     },
      monto:   { label: 'Monto',   type: 'money'     },
      fecha:   { label: 'Fecha',   type: 'date'      },
    },
    viewMode: 'table',
    useCheckboxes: true,
    showDynamicView: true,
    favoritesId: 'clientes',
    actions: [
      { label: 'Editar', className: 'bg-sky-500',  callback: (item) => {console.log('edit', item)} },
      { label: 'Ver',    className: 'bg-emerald-500', callback: (item) => {console.log('view', item)} },
    ],
    globalActions: [
      { label: 'Eliminar seleccionados', callback: (items) => {console.log(items)} }
    ]
  };

  arrayExample: string = `
    data = [
      {
        "cod": 1,
        "nombre": "javier",
        "puesto": "desarrollador",
        "ingreso": "2015"
      },
      {
        "cod": 2,
        "nombre": "claudia",
        "puesto": "front",
        "ingreso": "2025"
      },
    ];
  `;

  dataTableConfigExample: string = `
    tableConfig: DataTableConfig = {
      data: this.data,
      columns: {
        nombre:  { label: 'Nombre',  type: 'text'     },
        monto:   { label: 'Monto',   type: 'money'     },
        fecha:   { label: 'Fecha',   type: 'date'      },
      },
      viewMode: 'table',
      useCheckboxes: true,
      showDynamicView: true,
      favoritesId: 'clientes',
      actions: [
        { label: 'Editar', className: 'bg-sky-500',  callback: (item) => console.log('edit', item) },
        { label: 'Ver',    className: 'bg-emerald-500', callback: (item) => console.log('view', item) },
      ],
      globalActions: [
        { label: 'Eliminar seleccionados', callback: (items) => console.log(items) }
      ]
    };
  `;

  htmlExample: string = `
    <cygnus-javi-table [config]="tableConfig" />
  `;

}
