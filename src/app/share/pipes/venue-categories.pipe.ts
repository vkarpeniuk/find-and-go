import { PipeTransform, Pipe } from '@angular/core';
import { Category } from '@models*';

@Pipe({ name: 'venueCategories' })
export class VenueCategoriesPipe implements PipeTransform {
  transform(value: Category[]): string {
    return value.map(c => c.name).join(', ');
  }
}
