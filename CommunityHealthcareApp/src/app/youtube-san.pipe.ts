import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'youtubeSan'
})
export class YoutubeSanPipe implements PipeTransform {

  constructor(private dom: DomSanitizer)
  {
  }

  transform(value: any, args?: any): any {
    console.log(value);
  }

}
