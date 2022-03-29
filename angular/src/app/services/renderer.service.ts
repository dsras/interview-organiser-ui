import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class RendererService {

    constructor() { }
    skillFormatter(value: Array<string>): any {
        // if (!value) return '';
        const mainDiv = document.createElement('div');
        value.forEach((skill: any) => {
            const skillSPan = document.createElement('span');
            skillSPan.className = 'pills';
            skillSPan.innerHTML = skill;
            mainDiv.appendChild(skillSPan);
        })
        return mainDiv.innerHTML;
    }
    dateFormatter(candidate: any): string {
        if (candidate && candidate.value){
            return moment(candidate.value).format('DD MMM YYYY');
        }
        return '';
    }
}
