import { Component, Input, OnInit } from '@angular/core';
import { APPCONSTANTS as AC } from 'src/app/constants/app.constant';

const PILL_CSS_DEFAULT = 'pill-default';

@Component({
    selector: 'app-pill',
    templateUrl: './pill.component.html',
    styleUrls: ['./pill.component.scss']
})
export class PillComponent implements OnInit {
    value$: string = '';
    isRemove$: boolean = false;
    type$: string = '';
    bgClass: string = PILL_CSS_DEFAULT;
    cb$: any;
    BG_PRIMARY: Array<string> = [AC.STATUS_CONSTANTS.AVAILABLE];
    BG_WARNING: Array<string> = [AC.STATUS_CONSTANTS.CLIENT_INTERVIEW_IN_PROGRESS, AC.STATUS_CONSTANTS.INTERVIEW_IN_PROGRESS,
        AC.STATUS_CONSTANTS.INTERVIEW_READY, AC.STATUS_CONSTANTS.MAPPED, AC.STATUS_CONSTANTS.OFFERED, AC.STATUS_CONSTANTS.YET_TO_BEGIN,
        AC.STATUS_CONSTANTS.ONBOARDING_IN_PROGRESS];
    BG_DANGER: Array<string> = [AC.STATUS_CONSTANTS.DROP_OUT, AC.STATUS_CONSTANTS.INTERVIEW_REJECTED, AC.STATUS_CONSTANTS.OFFER_REJECTED];
    BG_SUCCESS: Array<string> = [AC.STATUS_CONSTANTS.STARTED, AC.STATUS_CONSTANTS.ONBOARDING, AC.STATUS_CONSTANTS.INTERVIEW_SELECTED,
        AC.STATUS_CONSTANTS.JOINED];
    @Input()
    set value(text: string) {
        if (text) {
            this.value$ = text;
            this.preparePillColor();
        }
    }
    
    @Input()
    set isRemove(value: boolean) {
        this.isRemove$ = value;
    }

    @Input()
    set type(value: string) {
        if (value) {
            this.type$ = value;
            if (this.type$ === AC.COMMON_CONSTANTS.GREEN) {
                this.bgClass += ' ' + AC.CSS_CONSTANTS.BG_SUCCESS;
            } else if (this.type$ === AC.COMMON_CONSTANTS.AMBER) {
                this.bgClass += ' ' + AC.CSS_CONSTANTS.BG_WARNING;
            } else if (this.type$ === AC.COMMON_CONSTANTS.RED) {
                this.bgClass += ' ' + AC.CSS_CONSTANTS.BG_RED;
            } else if (this.type$ === AC.COMMON_CONSTANTS.PRIMARY) {
                this.bgClass += ' ' + AC.CSS_CONSTANTS.BG_PRIMARY;
            }
        }
    }
    @Input()
    set wrapper(value: string) {
        if (value) {
            if (value === 'table') {
                this.bgClass += ' wrapper-table';
            } else if (value === 'inline-block') {
                this.bgClass += ' wrapper-inline-block';
            }
        }
    }

    @Input()
    set cb(value: any) {
        if (value) {
            this.cb$ = value;
        }
    }
    constructor() { }

    ngOnInit(): void {
    }
    removePill(): void {
        if (this.cb$) {
            this.cb$(this.value$);
        }
    }
    preparePillColor(): void {
        if (this.BG_WARNING.indexOf(this.value$) >= 0) {
            this.bgClass += ' ' + AC.CSS_CONSTANTS.BG_WARNING;
        } else if (this.BG_PRIMARY.indexOf(this.value$) >= 0){
            this.bgClass += ' ' + AC.CSS_CONSTANTS.BG_PRIMARY;
        } else if (this.BG_DANGER.indexOf(this.value$) >= 0) {
            this.bgClass += ' ' + AC.CSS_CONSTANTS.BG_RED;
        } else if (this.BG_SUCCESS.indexOf(this.value$) >= 0) {
            this.bgClass += ' ' + AC.CSS_CONSTANTS.BG_SUCCESS;
        }
    }
}
