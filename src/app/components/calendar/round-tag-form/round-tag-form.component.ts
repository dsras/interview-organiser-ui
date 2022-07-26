import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';

@Component({
  selector: 'round-tag-form',
  templateUrl: './round-tag-form.component.html',
  styleUrls: ['./round-tag-form.component.scss']
})
export class RoundTagFormComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject();
  /** Empty skills form to be populated by user */
  roundTagForm: FormGroup = this.fb.group({
    StageLevel: ['', Validators.required]
  });

  TagsList=[
    'R1',
    'R2',
    'Sponsor'
  ]

  constructor(
    private fb: FormBuilder,
    private rs: RequestCenterService,
    private _dialog: MatDialogService,
    private userService: GetUserDataService
  ) {}
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // ? should this be private ?
  /** {@link MatDialogService} */
  openDialog(template: TemplateRef<any>): void {
    this._dialog.openDialog(template);
    this._dialog.dialogRef
      ?.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.roundTagForm.reset();
      });
  }

  // ? Should this be private ?
  /** {@link ModalControllerService} */
  closeDialog(): void {
    this._dialog.closeDialog();
  }

  /**
   * Selects and submits the correct skill id with user's username to be sent
   * to request handling service.
   * {@link RequestCenterService}
   *
   * Triggered on press of submit button.
   *
   * @param form completed form to be submitted
   */
  onSubmit(form: FormGroup | any): void {
    const RoundTag: string = JSON.stringify(form.value.StageLevel).slice(1, -1);
    this.rs.setTag(this.userService.getUsername(), RoundTag).subscribe(data =>{
      console.log(data);
    });
  }

}
