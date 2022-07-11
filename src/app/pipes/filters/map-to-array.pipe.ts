import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapToArray'
})
export class MapToArrayPipe implements PipeTransform {

  transform<K, V>(input: Map<K, V>): Array<V> {
    return Array.from(input.values())

  }

}
