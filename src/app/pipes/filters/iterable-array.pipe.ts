import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterableArray'
})
export class IterableArrayPipe implements PipeTransform {

  transform<T>(input: IterableIterator<T>): Array<T> {
    const outputArray = Array.from(input)
    return outputArray
  }

}
