import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
    message: string = '';
    constructor(public bsModalRef: BsModalRef) { }
    cb:any;
    type: string = '';
    ngOnInit(): void {
    }
    closeModal(): void {
        this.bsModalRef.hide();
        if (this.cb) {
            this.cb.call();
        }
    }
}
