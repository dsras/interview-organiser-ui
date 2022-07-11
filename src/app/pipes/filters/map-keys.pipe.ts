import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapKeys'
})
export class MapKeysPipe implements PipeTransform {

  transform<K, V>(input: Map<K, V>): Array<K> {
    return Array.from(input.keys());
  }

}
