import { PipeTransform, Pipe } from '@angular/core';

import { VenueDetails } from '@models*';

@Pipe({ name: 'venueBgPhoto' })
export class VenueBgPhotoPipe implements PipeTransform {
  transform(value: VenueDetails): string {
    const photosCount = value.photos.length;
    if (photosCount) {
      const randomNumber = Math.floor(Math.random() * Math.floor(photosCount));
      return value.photos[randomNumber];
    }

    return '';
  }
}
