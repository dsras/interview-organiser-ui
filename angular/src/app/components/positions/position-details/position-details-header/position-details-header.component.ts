import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreatePositionComponent } from '../../create-position/create-position.component';

@Component({
    selector: 'app-position-details-header',
    templateUrl: './position-details-header.component.html',
    styleUrls: ['./position-details-header.component.scss']
})
export class PositionDetailsHeaderComponent implements OnInit {
    selectedRow$: any;
    metadata$: any;
    bsModalRef?: BsModalRef;
    imageSrc: string = '';

    @Input()
    set selectedRow(value: any) {
        if(value) {
            this.selectedRow$ = value;
            this.prepareImageSrc();
        }
    }

    @Input()
    set metadata(value: any) {
        if (value) {
            this.metadata$ = value;
        }
    }
    constructor(private _modalService: BsModalService) { }

    ngOnInit(): void {
    }
    editPosition(): void {
        const initialState: ModalOptions = {
            initialState: {
                metaData: this.metadata$,
                selectedData: this.selectedRow$,
                modalType:'edit'
            },
            class: 'modal-lg'
        };
        this.bsModalRef = this._modalService.show(CreatePositionComponent, initialState);
    }
    // [This should be removed once the API starts giving the image URL]
    prepareImageSrc(): void {
        if (this.selectedRow$.account === 'Fidelity') {
            this.imageSrc = '/assets/images/fidelity.png';
        } else if (this.selectedRow$.account === 'MS') {
            this.imageSrc = '/assets/images/ms.jpg';
        } else if (this.selectedRow$.account === 'LifeSight') {
            this.imageSrc = '/assets/images/lifesight.png';
        } else if (this.selectedRow$.account === 'GS') {
            this.imageSrc = '/assets/images/gs.png';
        }
    }
}
