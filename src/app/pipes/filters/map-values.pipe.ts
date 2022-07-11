import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapValues',
})
export class MapValuesPipe implements PipeTransform {
  transform<K, V>(input: Map<K, V>): Array<V> {
    return Array.from(input.values());
  }
}
