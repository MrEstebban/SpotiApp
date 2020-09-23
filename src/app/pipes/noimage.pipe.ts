import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(imagenes: any[]): string {

    if (!imagenes || !(imagenes[1])){
      return './assets/img/noimage.png';
    }

    if (imagenes.length > 0){
      return imagenes[1].url;
    }
  }

}
