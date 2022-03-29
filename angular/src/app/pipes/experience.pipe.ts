import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'experience'
})
export class ExperiencePipe implements PipeTransform {
    transform(value: number): string {
        if (value) {
            const years = Math.floor(value / 12);
            const months = value - (12 * years);
            return years + 'Y  ' + months + 'M';
        }
        return '';
    }

}
