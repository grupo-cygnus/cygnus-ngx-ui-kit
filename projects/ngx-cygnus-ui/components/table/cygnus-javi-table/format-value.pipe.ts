import { Pipe, PipeTransform } from '@angular/core';
import { ColumnType } from './data-table.models';

@Pipe({ name: 'formatValue', standalone: true })
export class FormatValuePipe implements PipeTransform {
  transform(value: any, type?: ColumnType): string {
    if (value === null || value === undefined || value === '') return '-';

    if (type === 'date' || type === 'datetime') {
      const date = new Date(value);
      if (isNaN(date.getTime())) return value;
      return new Intl.DateTimeFormat('es-CL', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        ...(type === 'datetime' && { hour: '2-digit', minute: '2-digit' })
      }).format(date);
    }

    const num = parseFloat(value);
    if (!isNaN(num)) {
      if (type === 'money') return new Intl.NumberFormat('es-CL', {
        style: 'currency', currency: 'CLP', minimumFractionDigits: 0
      }).format(num);
      if (type === 'number') return new Intl.NumberFormat('es-CL').format(num);
    }

    return value;
  }
}
